import 'lazysizes';
import { throttle } from './helpers/lodashHandmade';

import { initLesson } from './helpers/consoleConfig.js';

import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { initModal, setModalImage } from './helpers/modal.js';
import Account from './classes/account';

initLesson('JS Lesson 20', 'Client-server communication, REST API part 2');

const modalInstance = initModal();
const galleryOptions = {
  lazy: true,
  placeholder: '/images/empty.png',
};

const gallery = new Gallery('#gallery', galleryOptions);
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

const blog = new Blog('blog');

const accountPage = new Account('account');

// adding simple tabs to the page
document.getElementById('page-tab').addEventListener('click', selectTab);
document.querySelector('button.default-active')?.click();

function selectTab(event) {
  const tabcontent = [...document.getElementsByClassName('tabcontent')];
  tabcontent.forEach((element) => element.style.display = 'none');

  const tablinks = [...document.getElementsByClassName('tablinks')];
  tablinks.forEach((tablink) => tablink.classList.remove('active'));

  const { id: tabId } = event.target.dataset;
  document.getElementById(tabId).style.display = 'block';
  event.target.classList.add('active');
}