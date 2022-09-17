import 'lazysizes';
import { throttle } from './helpers/lodashHandmade';

import { initLesson } from './helpers/consoleConfig.js';

import Account from './classes/account';
import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { Tabs } from './classes/tabs';
import { initModal, setModalImage } from './helpers/modal.js';

initLesson('JS Lesson 20', 'Client-server communication, REST API part 2');

const modalInstance = initModal();
const galleryOptions = {
  lazy: true,
  placeholder: '/images/empty.png',
};

// main tab parts
const progressBar = new ProgressBar('progress');

// adding simple tabs to the page
const tabConfig = [
  { name: 'Art Gallery', item: Gallery, args: [galleryOptions, handleClickOnImage], default: true },
  { name: 'Microblog', item: Blog },
  { name: 'Account Search', item: Account },
];

new Tabs('page-tabs', tabConfig);

/**
 * Shows modal with our selected image
 * @param {MouseEvent} event
 */
function handleClickOnImage({ target }) {
  setModalImage(target.dataset.source);
  modalInstance.show();
}

// not quicker than once per 120 millis
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


