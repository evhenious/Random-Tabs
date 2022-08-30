import { initLesson } from '../config.js';

initLesson('JS Lesson 11', 'Модуль 6. Заняття 11. DOM.');



//? поговоримо про async / defer скрипти
/*
  D - script download
  X - script execution

  html    ||||||||||||||||         |||||||||||||||||||||||||||||||
  script                  DDDD-XXXX

  async script
  html    ||||||||||||||||         |||||||||||||||||||||||||||||||
  script                DD-   XXXXX
  script             DDDD-XXXX


  defer script
  html    |||||||||||||||||||||||||||||||||||||||||||||||
  script                  DDDD                           XXXX
  script                           D                         XX
*/






//? вставка декількох елементів разом (append | innerHTML | createDocumentFragment)
//* for <ul id="list-root"></ul>

// v0 - 4 inserts (sloooooow) ----------------------------
// const items = ['html', 'css', 'javascript', 'typescript', 'php', 'python'];

// const listRoot = document.querySelector('#list-root');

// console.time('6 inserts');
// for (let i = 0; i < items.length; i += 1) {
//   const li = document.createElement('li');
//   li.textContent = items[i];
//   li.classList.add('list-item');

//   listRoot.appendChild(li); //! 4 окремі вставки
// }
// console.timeEnd('6 inserts');


// // v1 - append (super fast) -------------------------------
// const listRoot1 = document.querySelector('#list-root-1');

// console.time('append');
// const storage = [];
// for (let i = 0; i < items.length; i += 1) {
//   const li = document.createElement('li');
//   li.textContent = items[i];
//   li.classList.add('list-item');

//   storage.push(li);
// }
// listRoot1.append(...storage);

// console.timeEnd('append');


// // v2 innerHTML (average speed) ---------------------------
// const listRoot2 = document.querySelector('#list-root-2');

// console.time('innerHTML');
// const storage2 = [];
// for (let i = 0; i < items.length; i += 1) {
//   const li = document.createElement('li');
//   li.textContent = items[i];
//   li.classList.add('list-item');

//   storage2.push(li.outerHTML);
// }

// listRoot2.insertAdjacentHTML('afterbegin', storage2.join(''));

// console.timeEnd('innerHTML');


// // v3 documetFragmet (a bit faster than average) ----------
// const listRoot3 = document.querySelector('#list-root-3');

// console.time('fragment');
// const fragment = document.createDocumentFragment();

// for (let i = 0; i < items.length; i += 1) {
//   const li = document.createElement('li');
//   li.textContent = items[i];
//   li.classList.add('list-item');

//   fragment.append(li);
// }

// listRoot3.append(fragment);
// console.timeEnd('fragment');

























//? замінити тільки текст в кнопці --------------------------------------------------
//* for <button class="btn">BTN-TEXT<image src="/images/favicon.ico" /></button>

// const btn = document.querySelector('button.btn');
// console.log('childNodes', btn.childNodes);
// console.log(btn.children);

// btn.childNodes[0].textContent = 'this is button';






















//? ООП ? ---------------------------------------------------------------------------
/*
  * спробуєм зробити на класах отаку кнопку з пов'язаним коментарем

  <input type="text" id="name-input" placeholder="Please enter your name" />
  <label for="name-input">Hello, <span id="name-label">Anonymous</span>!</div>

  input-root
*/


class CustomInput {
  #input;
  #label;
  #defaultLabelText = 'Hello, anonymous';

  constructor() {
    const inputId = 'name-input';
    const inputElem = document.createElement('input');
    inputElem.setAttribute('type', 'text');
    inputElem.setAttribute('id', inputId);
    inputElem.setAttribute('placeholder', 'Please enter your name');
    this.#input = inputElem;

    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', inputId);
    labelElem.innerText = this.#defaultLabelText;
    this.#label = labelElem;
  }

  render(rootId = '') {
    const rootElem = document.getElementById(rootId);
    rootElem.append(this.#input, this.#label);

    this.#addInputHandler();
  }

  #addInputHandler() {
    this.#input.addEventListener('input', ({ target }) => {
      this.#label.innerText = target.value ? `Hello, ${target.value}` : this.#defaultLabelText;
    });
  }

}

// const customInput = new CustomInput();
// customInput.render('input-root');

