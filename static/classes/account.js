import { getMapIframe } from "../helpers/mapHelper";

const defaultInputPlaceholder = 'Please type your login';

class Account {
  #form;
  #usernameInput;
  #data;

  constructor(rootId) {
    this.#form = document.createElement('form');
    this.#usernameInput = this.#initUsernameInput();
    this.#data = document.createElement('div');

    this.#form.append(this.#usernameInput);
    this.#form.addEventListener('submit', this.handleSubmit.bind(this));

    document.getElementById(rootId).append(this.#form, this.#data);
  }

  handleSubmit(event) {
    event.preventDefault();

    const isInputValid = this.validateUsernameInput();
    if (!isInputValid) {
      this.setInputValid(false, 'Field cannot be empty');

      setTimeout(() => {
        this.setInputValid(true);
      }, 3_000);

      return;
    }

    //! fetch user
    const userName = this.#usernameInput.value;
    fetch(`http://jsonplaceholder.typicode.com/users?username=${userName}`)
      .then((data) => data.json()) // дістаємо наші дані із респонса в форматі JSON
      .then((data = []) => {
        // якщо пошук юзера повернув пустий масив - кидаємо помилку "не знайдено"
        if (!data.length) {
          throw new Error(`User [${userName}] not found...`);
        }

        const [user] = data;
        return user;
      })
      .then((user) => {
        // якщо юзер знайдений - пробуєм дістати його пости по юзер айді
        return fetch(`http://jsonplaceholder.typicode.com/users/${user.id}/posts`)
          .then((data) => data.json())
          .then((posts) => ({ user, posts }))
      })
      .then(({ user, posts = [] }) => {
        //* show the MAP and some posts!
        const userMap = getMapIframe(user.address.geo);

        const postDivs = posts.map((post) => {
          const div = document.createElement('div');
          div.innerHTML = `<div>${post.title}</div><span>${post.body}</span><br/><br/>`;
          return div;
        });

        this.#data.replaceChildren(userMap, ...postDivs);
      })
      .catch((err) => {
        this.setInputValid(false, err.message);
        this.#data.innerHTML = '';
        setTimeout(() => {
          this.setInputValid(true);
        }, 3_000);
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
