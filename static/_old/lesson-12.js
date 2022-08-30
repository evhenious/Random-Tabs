import { initLesson } from '../config.js';

initLesson('JS Lesson 12', 'Модуль 6. Заняття 12. Events.');



//? про events взагалі -----------------------------------------------------------

// class CustomInput {
//   #input;
//   #label;
//   #defaultLabelText = 'What about homework?';

//   constructor() {
//     const inputId = 'name-input';
//     this.#buildInput(inputId);
//     this.#buildLabel(inputId);
//   }

//   #buildInput(elementId) {
//     const inputElem = document.createElement('input');
//     inputElem.setAttribute('type', 'text');
//     inputElem.setAttribute('id', elementId);
//     inputElem.setAttribute('placeholder', 'Please enter your name, and - ');
//     this.#input = inputElem;
//   }

//   #buildLabel(relatedInputId) {
//     const labelElem = document.createElement('label');
//     labelElem.setAttribute('for', relatedInputId);
//     labelElem.innerText = this.#defaultLabelText;
//     labelElem.classList.add('btn-label');
//     this.#label = labelElem;
//   }

//   /**
//    * @param {string} rootId id of the root elem where customInput will be added
//    */
//   render(rootId = '') {
//     const rootElem = document.getElementById(rootId);
//     rootElem.append(this.#input, this.#label);

//     this.#addInputHandler();
//   }

//   #addInputHandler() {
//     this.#input.addEventListener('input', (event) => {
//       const { value } = event.target;
//       this.#label.innerText = value ? `Hello, ${value}` : this.#defaultLabelText;
//     });
//   }

//   handleEvent(eventType = '', handlerFn = (event) => console.log(event)) {
//     this.#input.addEventListener(eventType, handlerFn);
//   }
// }

// const customInput = new CustomInput();
// customInput.render('input-root');

// customInput.handleEvent('blur', (event) => {
//   const { value: typedText = '' } = event.target;

//   // highway to hell? nope, just regex
//   // перевіряємо такий формат: 097-111-22-33
//   const result = typedText.replace(/\d{3}-\d{3}-\d{2}-\d{2}/, '');
//   if (result.length > 0) {
//     // console.warn('wrong format');
//     event.target.classList.add('red-bg');
//     return;
//   }

//   event.target.classList.remove('red-bg');
// });
// customInput.handleEvent('mousedown');
// customInput.handleEvent('mouseup');









//? keyboard events --------------------------------------------------------------

/**
 * Creates pretty 'pressed key on keyboard' element
 * @param {Event} event
 * @returns {HTMLElement}
 */
 function makeKeyItem(event) {
  const kbdElement = document.createElement('kbd');
  kbdElement.innerHTML = `key: ${event.key} <=> code: ${event.code}`;
  return kbdElement;
}

// const keyLog = document.getElementById('keylog');
// document.getElementById('name-input').addEventListener('keydown', (event) => {
//   keyLog.append( makeKeyItem(event) );

  // const { altKey, code } = event;
  // if ( altKey && code === 'KeyG') {
  //   event.target.classList.toggle('green-bg');
  // }
// });
























//? дефолтна поведінка, доступ до властивостей -----------------------------------
// const form = document.querySelector(".register-form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const {
//     elements: { username, password } //! одне із питань - що тут відбувається?
//   } = event.currentTarget;

//   // const { elements } = event.currentTarget;
//   // const { username, password } = elements;


//   if (password.value.length === 0) {
//     password.classList.add('red-bg');
//     password.focus();
//   }

//   if (password.value.length > 10) {
//     password.value = password.value.slice(0, 10);
//   }


//   console.log(username.value, password.value);
// });





























//? events for select [change, focus] --------------------------------------------
/*
  <div id="pizza-root">

    <select class="pizza-select">
      <option value="four_meats">Four Meats</option>
      <option value="royal_cheese">Royal Cheese</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="smoked_salmon">Smoked Salmon</option>
    </select>
    <div class="items">
      <div class="pizza-item">Four Meats</div>
      <div class="pizza-item">Royal Cheese</div>
      <div class="pizza-item">Vegetarian</div>
      <div class="pizza-item">Smoked Salmon</div>
    </div>

  </div>

* select - ідеальний кандидат на кастомний клас-компонент
*/

// якщо ми тепер змінюємо список назв в масиві - зміюється і select, і набіл картинок
// але вегетаріано все одно буде з ковбасою в нашому випадку (якщо залишити css класи як є) :)
const items = ['Four Meats', 'Royal Cheese', 'Vegetarian', 'Smoked Salmon' ];

class PizzaMenu {
  #pizzaSelect;
  #pizzaPics;

  constructor(items = []) {
    // створюємо select і додаємо в нього options
    const pizzaSelect = document.createElement('select');
    pizzaSelect.classList.add('pizza-select');
    this.#pizzaSelect = pizzaSelect;
    this.#addSelectOptions(items);

    // створюємо div з набором картинок
    const pizzaPics = document.createElement('div');
    pizzaPics.classList.add('items');
    this.#pizzaPics = pizzaPics;
    this.#addPizzaPictures(items);
  }

  #addSelectOptions(items) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.innerText = '';

    // <option value="royal_cheese">Royal Cheese</option>
    const options = items.map((item) => {
      const option = document.createElement('option');
      option.value = item.toLowerCase().replace(' ', '_');
      option.innerText = item;
      return option;
    });

    this.#pizzaSelect.append(emptyOpt, ...options);
  }

  #addPizzaPictures(items = []) {
    // <div class="items">
    // <div class="pizza-item">Four Meats</div>
    const pizzas = items.map((item) => {
      const div = document.createElement('div');
      div.classList.add('pizza-item');
      const pizzaId = item.toLowerCase().replace(' ', '_');
      div.setAttribute('id', pizzaId);
      div.innerText = item;

      // event handler
      div.addEventListener('click', (event) => {
        const { id } = event.target;
        this.#pizzaSelect.value = id;

        this.#clearFocus();
        event.target.classList.add('focused');
      });

      return div;
    });

    this.#pizzaPics.append(...pizzas);
  }

  /**
   * Add pizza controls to root element with diven id
   * @param {string} rootId
   */
  render(rootId) {
    document.getElementById(rootId).append(this.#pizzaSelect, this.#pizzaPics);

    this.#pizzaSelect.addEventListener('change', (event) => {
      const { value: selectedItem } = event.target;

      this.#clearFocus();
      document.getElementById(selectedItem).classList.add('focused');
    });
  }

  /**
   * Clears focus from previously selected pizza picture
   */
  #clearFocus() {
    const focusedNow = document.querySelector('div.focused');
    if (focusedNow) {
      focusedNow.classList.remove('focused');
    }
  }
}

const pizzaMenu = new PizzaMenu(items);
pizzaMenu.render('pizza-root');
