import 'lazysizes';
import { throttle } from './helpers/lodashHandmade'

import { initLesson } from './helpers/consoleConfig.js';

import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { galleryItems, shuffle } from './helpers/imagesConfig.js';
import { initModal, setModalImage } from './helpers/modal.js';
import { runHeavyWork, runHeavyWorkV2 } from './helpers/heavyWork';

initLesson('JS Lesson 18', 'Asynchronous code - Promises');

const modalInstance = initModal();
const galleryOptions = {
  lazy: true,
  placeholder: '/images/empty.png',
};

const gallery = new Gallery('#gallery', shuffle(galleryItems), galleryOptions);
gallery.addClickHandler(handleClickOnImage);

/**
 * Shows modal with our selected image
 * @param {MouseEvent} event
 */
function handleClickOnImage({ target }) {
  setModalImage(target.dataset.source);
  modalInstance.show();
}

const progressBar = new ProgressBar('progress');

// не даємо виконувати частіше ніж 120 мілісекунд
const intervalLength = 120; // milliseconds
const throttledFunc = throttle(() => {
  progressBar.setLength(getProgressLength());
}, intervalLength);

window.addEventListener('scroll', throttledFunc);

/**
 * Returns scrolled page percentage
 * @returns {number}
 */
function getProgressLength() {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.body;
  const scrollPercent = scrollY / (scrollHeight - innerHeight);

  return Math.round(scrollPercent * 100);
}

const blog = new Blog('lesson-title');

document.getElementById('lesson-title')
  .addEventListener('click', runHeavyWorkV2);


// const someAsyncStuff = new Promise((resolve, reject) => {
//   // some super-async stuff
//   console.log('Promise is ongoing...');

//   resolve('Hello from Promise');
//   // reject(new Error('oops'));
// });



// someAsyncStuff
//   .then((value) => console.log(value))
//   .catch((value) => console.warn(value))
//   .finally(() => {
//     console.log('finally...')
//   });

// someAsyncStuff.catch(() => console.log('another catch'));

// setTimeout(() => {
//   console.log('Hello from timer')
// }, 0);

// console.log('End of sync code');

// Web worker - окрема сутність з власним незалежним івент лупом і глобалами. В ньому можна робити будь-які важкі речі,
// і це не буде блокувати основний івент луп, рендерінг, і так далі.
// Web worker не має доступу до html, єдиний спосіб взаємодії з ним - відправка команд через _postMessage_
// і отримання відповідей через _onmessage_

// Створюємо воркер на базі окремого файла - не на базі простого імпорта функції!
const worker = new Worker('./worker.js', { type: 'module' });

// можна відправляти будь-які дані - строки, об'єкти... вони будуть склоновані і копії передані в воркер
console.log('Main thread:', 'Asking worker to run a few tasks');

worker.postMessage({ command: 'run-heavy-work' });
worker.postMessage({ command: 'do-a-barrel' });

// один івент хендлер на всі мессаджі
worker.onmessage = (event) => {
  // отримуєм відповідь з воркера
  console.log('Main thread:', event.data);
}

console.log('Main thread:', 'End');
