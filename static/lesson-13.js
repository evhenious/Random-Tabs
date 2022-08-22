import { initLesson } from './config.js';

initLesson('JS Lesson 13', 'Модуль 7. Заняття 13. Event Propagation.');



//? events for select [change, focus] --------------------------------------------
/*
  приклад на делегування подій з попереднього заняття
*/

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

  #addSelectOptions(items = []) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.innerText = '';

    // ex: <option value="royal_cheese">Royal Cheese</option>
    const options = items.map((item) => {
      const option = document.createElement('option');
      option.value = item.toLowerCase().replace(' ', '_');
      option.innerText = item;
      return option;
    });

    this.#pizzaSelect.append(emptyOpt, ...options);
  }

  #addPizzaPictures(items = []) {
    // ex:
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
  render(rootId = '') {
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










function createBoxes(number) {
  const divElts = document.querySelector("#boxes");

  const divs = [];
  for (let i = 0, size = 30; i < number; i++, size += 10) {
    const div = document.createElement("div");
    div.style.backgroundColor = 'darkgrey';
    div.classList.add("box");
    div.style.height = `${size}px`;
    div.style.width = `${size}px`;

    divs.push(div);
  }

  divElts.append(...divs);
}

createBoxes(3);
