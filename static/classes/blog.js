import { debounce } from '../helpers/lodashHandmade';
import { clearData, getData, saveData } from '../helpers/storage';

const defaultInputPlaceholder = 'Enter your notes...';

class Blog {
  #postsRoot;
  #content;
  #form;
  #date;
  #text;

  #blogPosts = [];

  constructor(siblingId = '') {
    // створюємо елементи для блогпост форми
    this.#form = document.createElement('form');
    this.#postsRoot = document.createElement('div');
    this.#postsRoot.setAttribute('id', 'posts');

    this.#date = document.createElement('input');
    this.#date.setAttribute('type', 'date');
    this.#date.defaultValue = new Date().toISOString().slice(0, 10);

    this.#text = document.createElement('input');
    this.#text.classList.add('text-input');
    this.#text.placeholder = defaultInputPlaceholder;
    this.#text.addEventListener('blur', this.#resetTextInputStatus.bind(this));

    // не даємо виконувати івент хендлер поки не пройде час після останнього виконання
    const timeToDebaunce = 1000; // 1 second
    const debouncedFunc = debounce((event) => {
      console.log(event.target.value);
    }, timeToDebaunce);
    this.#text.addEventListener('input', debouncedFunc);


    // місце для додавання збережених постів
    this.#content = document.createElement('div');

    this.#postsRoot.append(this.#content, this.#form);
    this.#form.append(this.#date, this.#text);

    document.getElementById(siblingId).insertAdjacentElement('afterend', this.#postsRoot);

    this.#initPostCreator();
    this.#blogPosts = getData() || [];

    this.#loadPosts();
  }

  /**
   * Adds for SUBMIT event handler which adds new posts
   */
  #initPostCreator() {
    const handleSubmit = (event) => {
      event.preventDefault();

      const isTextValid = this.#validateTextInput();
      if (!isTextValid) {
        this.#text.placeholder = 'Field cannot be empty';

        setTimeout(() => {
          this.#resetTextInputStatus();
          this.#text.placeholder = defaultInputPlaceholder;
        }, 3_000);

        return;
      }

      const newPost = {
        date: this.#date.value,
        content: this.#text.value,
      };
      this.#blogPosts.push(newPost);
      saveData(this.#blogPosts);

      this.#text.value = '';
      this.#loadPosts();
    };

    this.#form.addEventListener('submit', handleSubmit);
  }

  #loadPosts() {
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

  #resetTextInputStatus() {
    this.#text.classList.remove('invalid');
  }

  /**
   * @returns {boolean}
   */
  #validateTextInput() {
    let isValid = true;

    if (!this.#text.value) {
      this.#text.classList.add('invalid');
      console.warn('empty input');
      isValid = false;
    }

    return isValid;
  }
}

export default Blog;
