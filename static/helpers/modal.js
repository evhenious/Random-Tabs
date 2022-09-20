import * as basicLightbox from 'basiclightbox';

// Too lazy to wrap it into a class, so let it be the way it is

/**
 * @typedef Modal
 * @type {Object}
 * @property {Object} instance the ref to basicLightbox modal itself, just in case we need it
 * @property {Function} showModalImage the way to show the modal with predefined **image**
 */

/** @type {Modal} */
const modalInstance = {
  instance: null,
  showModalImage,
};

/**
 * Returns ref to modal instance.
 * Handles modal init process if it's the very first attempt to use modal
 * @returns {Modal} modalInstance
 */
function getModalInstance() {
  // assuming basicLightbox is available globally
  if (!basicLightbox) {
    console.warn('basicLightbox is not available');
    return null;
  }

  if (!modalInstance.instance) {
    modalInstance.instance = basicLightbox.create(`<div class="modal"></div>`);
  }

  return modalInstance;
}

/**
 * Convenient wrapper to put an image into the modal.
 *  @param {string} src link to the image to show
 */
function showModalImage(src = '/images/empty.png') {
  const image = document.createElement('img');
  image.setAttribute('width', 640);
  image.setAttribute('height', 480);
  image.src = src;

  setModalContent(image);
  modalInstance.instance.show();
}

/**
 * Generic way to set **anything** into modal.
 * @param {HTMLElement} content
 */
function setModalContent(content) {
  const modalRoot = modalInstance.instance.element().querySelector('.modal');
  modalRoot.replaceChildren(content);
}

export { getModalInstance };
