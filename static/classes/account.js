import { getMapIframe } from '../helpers/mapHelper';
import { getPostsForUser, getUserByName } from '../helpers/networkHelper';
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

  handleSubmit(event) {
    event.preventDefault();

    const isInputValid = this.validateUsernameInput();
    if (!isInputValid) {
      this.setInputValid(false, 'Field cannot be empty');
      setTimeout(this.setInputValid.bind(this, true), 3_000);
      return;
    }

    //! fetch user
    const userName = this.#usernameInput.value;
    getUserByName(userName)
      // якщо юзер знайдений - пробуєм дістати його пости по юзер айді
      .then(
        (user) => getPostsForUser(user.id).then((posts) => ({ user, posts }))
      )
      .then(({ user, posts = [] }) => {
        //* show the MAP and some posts!
        const userMap = getMapIframe(user.address.geo);

        const postDivs = posts.map((post) => {
          const div = document.createElement('div');
          div.classList.add('user-post');
          div.innerHTML = `<div>${post.title}</div><span>${post.body}</span>`;
          return div;
        });

        this.#data.replaceChildren(userMap, ...postDivs);
      })
      // якщо юзер НЕ знайдений - обробка помилок
      .catch((err) => {
        this.setInputValid(false, err.message);
        this.#data.innerHTML = '';
        setTimeout(this.setInputValid.bind(this, true), 3_000);
      });
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
  setInputValid(isValid = true, placeholder = defaultInputPlaceholder) {
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
