let modalInstance = null;

/**
 * @returns Object basicLightbox modalInstance
 */
export function initModal() {
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

export function setModalImage(src = '') {
  const imageInsideModal = modalInstance.element().querySelector('.modal>img');
  imageInsideModal.src = src;
}
