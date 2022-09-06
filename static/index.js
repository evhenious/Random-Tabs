import 'lazysizes';
import { throttle } from './helpers/lodashHandmade'

import { initLesson } from './helpers/consoleConfig.js';

import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { galleryItems, shuffle } from './helpers/imagesConfig.js';
import { initModal, setModalImage } from './helpers/modal.js';

initLesson('JS Lesson 17', 'Timers, asynchronous code');

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




// date playground
const someDate = new Date();
const someAnotherDate = new Date('2022-08-30');

console.log(someDate.toISOString(), someDate.getTime());

console.log({
  'local hours': someDate.getHours(),
  'UTC hours': someDate.getUTCHours(),
  'local day': someDate.getDate(),
  'UTC day': someDate.getUTCDate()
});

console.log((someDate - someAnotherDate) / (1000 * 60 * 60));