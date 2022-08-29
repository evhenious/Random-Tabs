import { initLesson } from './config.js';
import Gallery from './helpers/gallery.js';
import { galleryItems } from './helpers/images.js';
import { initModal, setModalImage } from './helpers/modal.js';
import ProgressBar from './helpers/progressBar.js';

initLesson('JS Lesson 15', 'Модуль 8. Модульність коду.');

const modalInstance = initModal();
const galleryOptions = {
  lazy: true,
  placeholder: '/images/empty.png',
};

const gallery = new Gallery('#gallery', galleryItems, galleryOptions);
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
window.addEventListener('scroll', _.throttle(() => {
  progressBar.setLength(getProgressLength());
}, 120));

/**
 * Returns scrolled page percentage
 * @returns {number}
 */
function getProgressLength() {
  const { clientHeight, scrollHeight } = document.body;
  const maxScroll = scrollHeight - clientHeight;
  return (window.scrollY * 100) / maxScroll;
}
