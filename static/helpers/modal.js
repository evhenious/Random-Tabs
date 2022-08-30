import * as basicLightbox from 'basiclightbox';

let modalInstance = null;

/**
 * @returns {Object} basicLightbox modalInstance
 */
function initModal() {
  // assuming basicLightbox is available globally
  if (!basicLightbox) {
    console.warn('basicLightbox is not available');
    return null;
  }

  if (!modalInstance) {
    modalInstance = basicLightbox.create(
      `<div class="modal">
        <img src="", width = "640", height = "480">
      </div>`
    );
  }

  return modalInstance;
}

function setModalImage(src = '') {
  const imageInsideModal = modalInstance.element().querySelector('.modal>img');
  imageInsideModal.src = src;
}


export {
  initModal,
  setModalImage
}