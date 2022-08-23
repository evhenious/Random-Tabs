import { initLesson } from './config.js';

initLesson('JS Lesson 13', 'Модуль 7. Заняття 13. Event Propagation.');




//? що таке console.log.bind(console) ?

// setTimeout(console.log, 1_000, 'test log');

// const { log } = console;
// setTimeout(log, 1_000, 'test log works?');

// const myLog = console.log;
// setTimeout(myLog, 1_000, 'test log works again and again');


// після підключення ліби через cdn, функціонал став доступний у вигляді глобала (так само як console, alert...)
const modal = basicLightbox.create(`
    <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`)



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

      div.addEventListener('click', (event) => {
        // console.log('pizza clicked!');
        // event.stopPropagation();

        // event.stopImmediatePropagation();
        modal.show(); // <-- показуємо нашу модалку _basicLightbox_
      });

      // div.addEventListener('click', (event) => {
      //   console.log('click handler #2');
      // });

      //! v1 event handler - one handler per one pizza
      // div.addEventListener('click', (event) => {
      //   const { id } = event.target;
      //   this.#pizzaSelect.value = id;

      //   this.#clearFocus();
      //   event.target.classList.add('focused');
      // });

      return div;
    });

    //! v2 delegation
    this.#pizzaPics.addEventListener('click', (event) => {
      if (!event.target.classList.value.includes('pizza-item')) return;

      console.log('div with pizzas clicked!');

      const { id } = event.target;
      this.#pizzaSelect.value = id;

      this.#clearFocus();
      event.target.classList.add('focused');
    });

    this.#pizzaPics.append(...pizzas);
  }

  /**
   * Add pizza controls to root element with diven id
   * @param {string} rootId
   */
  render(rootId = '') {
    document.getElementById(rootId).append(this.#pizzaSelect, this.#pizzaPics);

    //! adding event handler for _SELECT_ element
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


//? z-index, position ? +

//? stopPropagation vs stopImmediatePropagation ?












//? accordion --------------------------------------------------------------------
// const accordionRoot = document.querySelector('#accordion');
// const accordionRoot = document.getElementById('accordion');
// accordionRoot.addEventListener('click', (event) => {
//   // зняти опціональні класи з усіх
//   document.querySelector('.active')?.classList?.remove('active');
//   document.querySelector('.visible')?.classList?.remove('visible');


//   const btn = event.target;
//   btn.classList.toggle('active');
//   btn.nextElementSibling.classList.toggle('visible');
// });



