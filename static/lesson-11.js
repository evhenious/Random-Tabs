import { initLesson } from './config.js';

initLesson('JS Lesson 11', 'Модуль 6. Заняття 11. DOM.');

//? ----------------------------------------------- питання з таблиці-----------------

//? вставка декількох елементів разом (append | innerHTML | createDocumentFragment)
const items = ['html', 'css', 'js', 'ts'];

const listRoot = document.querySelector('#root');

console.time('insert 4 diff');
for (let i = 0; i < items.length; i += 1) {
  const li = document.createElement('li');
  li.textContent = items[i];
  li.classList.add('list-item');

  listRoot.appendChild(li); //! 4 окремі вставки
}
console.timeEnd('insert 4 diff');


//? ----------------------------------------------------------------------------------

//? ## Example 00 -
