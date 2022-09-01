import { throttle } from 'lodash';
import 'lazysizes';

import { initLesson } from './helpers/consoleConfig.js';

import Gallery from './helpers/gallery.js';
import { galleryItems, shuffle } from './helpers/imagesConfig.js';
import { initModal, setModalImage } from './helpers/modal.js';
import ProgressBar from './helpers/progressBar.js';
import Blog from './helpers/blog.js';

initLesson('JS Lesson 16', 'Local Storage, Session Storage');

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
window.addEventListener('scroll', throttle(() => {
  progressBar.setLength(getProgressLength());
}, 120));

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
