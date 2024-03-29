import { getFromStorage, saveToStorage } from '../helpers/storage';
import { Mountable } from './tabs';

const defaultInputPlaceholder = 'Enter your notes...';
const storageKeyBlogPosts = 'blogPosts';

class Blog extends Mountable {
  #postsRoot;
  #content;
  #form;
  #date;
  #text;
  #filePicker;

  #blogPosts = [];

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent, 'blog');

    // створюємо елементи для блогпост форми
    this.#form = document.createElement('form');
    this.#postsRoot = document.createElement('div');
    this.#postsRoot.setAttribute('id', 'posts');

    this.#date = this.#initDatePicker();
    this.#text = this.#initTextInput();

    this.#filePicker = document.createElement('input');
    this.#filePicker.setAttribute('type', 'file');

    this.#filePicker.addEventListener('change', ({ target }) => {
      const [fileMetadata] = target.files;
      try {
        fileMetadata
          .text()
          .then((value) => console.log(JSON.parse(value)))
          .catch((err) => console.warn('Cannot parse JSON', err));
      } catch (err) {
        console.warn('no file selected');
      }
    });

    // місце для додавання збережених постів
    this.#content = document.createElement('div');
    this.#postsRoot.append(this.#form, this.#content);
    this.#form.append(this.#date, this.#text, this.#filePicker);

    this.root.append(this.#postsRoot);

    this.#form.addEventListener('submit', this.#postCreator.bind(this));

    this.#blogPosts = getFromStorage(storageKeyBlogPosts) || [];
    this.#renderPosts();
  }

  /**
   * Adds new post
   */
  #postCreator(event) {
    event.preventDefault();

    const isTextValid = this.validateTextInput();
    if (!isTextValid) {
      this.#text.placeholder = 'Field cannot be empty';

      setTimeout(() => {
        this.resetTextInputStatus();
        this.#text.placeholder = defaultInputPlaceholder;
      }, 3_000);

      return;
    }

    const newPost = {
      date: this.#date.value,
      content: this.#text.value,
    };

    this.#blogPosts.unshift(newPost);
    saveToStorage(storageKeyBlogPosts, this.#blogPosts);

    this.#text.value = '';
    this.#renderPosts();
  }

  #renderPosts() {
    // тут може бути сортування... або ні :)
    const preparedDivs = this.#blogPosts.map((post) => {
      const { date, content } = post;
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerText = `${date} - ${content}`;

      return postDiv;
    });

    this.#content.replaceChildren(...preparedDivs);
  }

  /**
   * Resets _invalid_ text input status
   */
  resetTextInputStatus() {
    this.#text.classList.remove('invalid');
  }

  /**
   * Triggers text validation in text input
   * @returns {boolean} is current text input value valid or not
   */
  validateTextInput() {
    let isValid = true;

    if (!this.#text.value) {
      this.#text.classList.add('invalid');
      console.warn('empty input');
      isValid = false;
    }

    return isValid;
  }

  /**
   * @returns {HTMLInputElement}
   */
  #initDatePicker() {
    const datePicker = document.createElement('input');
    datePicker.setAttribute('type', 'date');
    datePicker.defaultValue = new Date().toISOString().slice(0, 10);

    return datePicker;
  }

  /**
   * @returns {HTMLInputElement}
   */
  #initTextInput() {
    const textInput = document.createElement('input');
    textInput.classList.add('text-input');
    textInput.placeholder = defaultInputPlaceholder;
    textInput.addEventListener('blur', this.resetTextInputStatus.bind(this));

    return textInput;
  }
}

export default Blog;
