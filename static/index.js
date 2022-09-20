import 'lazysizes';
import { throttle } from './helpers/lodashHandmade';

import { initLesson } from './helpers/consoleConfig.js';

import Account from './classes/account';
import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { Tabs } from './classes/tabs';
import { getModalInstance } from './helpers/modal.js';
import UserList from './classes/userList';

initLesson('JS Pre-Final Lesson 21', 'CRUD, REST API part 3');

const modalInstance = getModalInstance();
const galleryOptions = {
  lazy: true,
  placeholder: '/images/empty.png',
};

const userListConfig = {
  columns: [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Tel. #' },
  ],
};

// main tab parts
const progressBar = new ProgressBar('progress');

// adding simple tabs to the page
const tabConfig = [
  { name: 'Art Gallery', item: Gallery, args: [galleryOptions, handleClickOnImage] },
  { name: 'Microblog', item: Blog },
  { name: 'Account Search', item: Account },
  { name: 'User List', item: UserList, args: [userListConfig], default: true },
];

new Tabs('page-tabs', tabConfig);

/**
 * Shows modal with our selected image
 * @param {MouseEvent} event
 */
function handleClickOnImage({ target }) {
  modalInstance.showModalImage(target.dataset.source);
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
