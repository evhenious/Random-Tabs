import * as basicLightbox from 'basiclightbox';

// Too lazy to wrap it into a class, so let it be the way it is

/**
 * @typedef Modal
 * @type {Object}
 * @property {Object} instance the ref to basicLightbox modal itself - just in case we would need it
 * @property {Function} showModalImage the way to show the modal with predefined **image**
 * @property {Function} showModal the way to show the modal with **any** given content
 */

/** @type {Modal} */
const modalInstance = {
  instance: null,
  showModalImage,
  showModal
};

/**
 * _Main_ function to work with modal. Returns ref to modal instance.
 * Handles modal init process if it's the very first attempt to use modal
 * @returns {Modal} modalInstance
 */
function getModalInstance() {
  // assuming basicLightbox is available globally
  if (!basicLightbox) {
    console.error('basicLightbox is not available');
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
  image.setAttribute('width', 1024);
  image.src = src;

  _setModalContent(image);
  modalInstance.instance.show();
}

/**
 * Convenient wrapper to put anything into the modal.
 *  @param {HTMLElement} content
 */
 function showModal(content) {
  _setModalContent(content);
  modalInstance.instance.show();
}

/**
 * Generic way to set **anything** into modal. Mainly not from direct usage
 * @private
 * @param {HTMLElement} content
 */
function _setModalContent(content) {
  const modalRoot = modalInstance.instance.element().querySelector('.modal');
  modalRoot.replaceChildren(content);
}

export { getModalInstance };
