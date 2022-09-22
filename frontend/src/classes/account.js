import { jsonPlaceholderApi as api } from '../helpers/networkHelper';
import { getMapIframe } from '../misc/mapHelper';
import { Mountable } from './tabs';

const defaultInputPlaceholder = 'Please type your login';

class Account extends Mountable {
  #form;
  #usernameInput;
  #data;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent, 'account');

    this.#form = document.createElement('form');
    this.#usernameInput = this.#initUsernameInput();
    this.#data = document.createElement('div');
    this.#data.setAttribute('id', 'user-content-root');

    this.#form.append(this.#usernameInput);
    this.#form.addEventListener('submit', this.handleSubmit.bind(this));

    this.root.append(this.#form, this.#data);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const isInputValid = this.validateUsernameInput();
    if (!isInputValid) {
      this.setInputStatus(false, 'Field cannot be empty');
      setTimeout(this.setInputStatus.bind(this, true), 3_000);
      return;
    }

    //! fetch user
    const userName = this.#usernameInput.value;
    try {
      const user = await api.getAccountByName(userName);
      const posts = await api.getPostsForUser(user.id);

      const userLocationMap = getMapIframe(user.address.geo);

      const postDivs = posts.map((post) => {
        const div = document.createElement('div');
        div.classList.add('user-post');
        div.innerHTML = `<div>${post.title}</div><span>${post.body}</span>`;
        return div;
      });

      this.#data.replaceChildren(userLocationMap, ...postDivs);
    } catch (err) {
      this.setInputStatus(false, err.message);
      setTimeout(this.setInputStatus.bind(this, true), 3_000);
      this.#data.innerHTML = '';
    }
  }

  /**
   * @returns {HTMLInputElement}
   */
  #initUsernameInput() {
    const textInput = document.createElement('input');
    textInput.classList.add('text-input');
    textInput.placeholder = defaultInputPlaceholder;

    return textInput;
  }

  /**
   * Triggers text validation in username input
   * @returns {boolean} is current input value valid or not
   */
  validateUsernameInput() {
    let isValid = true;

    if (!this.#usernameInput.value) {
      console.warn('empty input');
      isValid = false;
    }

    return isValid;
  }

  /**
   * [Re]sets _invalid_ text input status
   * @param {boolean} isValid
   * @param {boolean} placeholder
   */
  setInputStatus(isValid = true, placeholder = defaultInputPlaceholder) {
    let action = 'remove';
    if (!isValid) {
      this.#usernameInput.value = '';
      action = 'add';
    }
    this.#usernameInput.classList[action]('invalid');
    this.#usernameInput.placeholder = placeholder;
  }
}

export default Account;
