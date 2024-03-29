import 'lazysizes';
import { throttle } from './misc/lodashHandmade';

import { galleryConfig, userListConfig } from '../appConfig';
import { initAppTitle } from './misc/appTitleSetup.js';

import Account from './classes/account';
import Blog from './classes/blog.js';
import Gallery from './classes/gallery.js';
import ProgressBar from './classes/progressBar.js';
import { Tabs } from './classes/tabs';
import { getModalInstance } from './helpers/modal.js';
import UserList from './classes/userList';
import MediaCapture from './classes/media';
import { initWebSocket } from './helpers/websocket';
import { getFromStorage } from './helpers/storage';

initAppTitle('Random Tabs', 'Mixed functionality, happy times!');
initWebSocket();

const modalInstance = getModalInstance();
const progressBar = new ProgressBar('progress');

const lastUsedTab = getFromStorage('lastTab') || 'User List';

// adding simple tabs to the page
const tabConfig = [
  { name: 'Art Gallery', item: Gallery, args: [galleryConfig, handleClickOnImage] },
  { name: 'Microblog', item: Blog },
  { name: 'Account Search', item: Account },
  { name: 'User List', item: UserList, args: [userListConfig] },
  { name: 'Media Capture', item: MediaCapture },
];

new Tabs('page-tabs', tabConfig.map((tab) => ({ ...tab, default: tab.name === lastUsedTab })));

/**
 * Shows modal with our selected image
 * @param {MouseEvent} event
 */
function handleClickOnImage({ target }) {
  modalInstance.showModalImage(target.dataset.source);
}

// not quicker than once per 120 millis
const throttledSetProgressLength = throttle(() => {
  progressBar.setLength(getProgressLength());
}, 120);
window.addEventListener('scroll', throttledSetProgressLength);

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
