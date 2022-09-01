import { clearData, getData, saveData } from './storage';

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

    this.#text = document.createElement('input');
    this.#text.classList.add('text-input');

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

      // а ще краще якби прикрутити валідацю і не давати натиснути Enter на пустій строчці
      if (!this.#text.value) {
        console.warn('empty input');
        return;
      }

      const defaultDate = new Date().toISOString().slice(0, 10);

      const newPost = {
        date: this.#date.value || defaultDate,
        content: this.#text.value
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
}

export default Blog;
