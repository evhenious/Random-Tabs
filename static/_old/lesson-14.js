import { initLesson } from '../config.js';
import { galleryItems } from './l-14/images.js';
import { initModal, setModalImage } from './l-14/modal.js';

initLesson('JS Lesson 14', 'Модуль 7. Заняття 14. Throttle/debounce/lazyload.');




//? throttle vs debounce part 0 - user tracking?
// window.addEventListener('mousemove', _.throttle(trackUser, 500));

// function trackUser() {
//   console.log('user still alive...');
// }



//? debounce part 1 - search?
// document.getElementById('search').addEventListener('input', _.debounce(triggerSearch, 1_000));

// function triggerSearch(event) {
//   console.log(`Searching with [${event.target.value}] string`);
// }






//? throttle part 2 - gallery + scroll
const galleryRoot = document.querySelector('#gallery');
const galleryImages = createGallery(galleryItems);

galleryRoot.append(...galleryImages);
galleryRoot.addEventListener('click', handleClickOnImage);

const modalInstance = initModal();

function createGallery(imagesConfig = []) {
  return imagesConfig
    .map(({ preview, original }) => {
      const img = document.createElement('img');
      img.classList.add('gallery-item');
      img.setAttribute('src', preview);
      img.setAttribute('data-source', original);
      return img;
    });
}

function handleClickOnImage({ target }) {
  if (!target.classList.contains('gallery-item')) return;

  setModalImage(target.dataset.source);
  modalInstance.show();
}



const progressBar = document.querySelector('.progress-container');
window.addEventListener('scroll', _.throttle(moveProgressBar, 150));

function moveProgressBar() {
  const maxScroll = document.body.scrollHeight - document.body.clientHeight;

  progressBar.style.width = `${Math.min( window.scrollY * 100 / maxScroll, 100 )}%`;
  console.log('scrolled');
};



//? lazyload
