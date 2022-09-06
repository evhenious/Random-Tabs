class Gallery {
  static #galleryImageClass = 'gallery-item';
  static #lazyLoadClass = 'lazyload';

  #galleryRoot;
  #options;

  constructor(galleryRootId = '', imagesConfig = [], options = {}) {
    this.#options = {...options};

    // init root element
    this.#galleryRoot = document.querySelector(galleryRootId);

    // init images based on given config
    this.#galleryRoot.append(...this.#createGalleryImages(imagesConfig));

  }

  /**
   * @param {Object[]} imagesConfig
   * @returns {HTMLImageElement[]}
   */
  #createGalleryImages(imagesConfig = []) {
    return imagesConfig.map(({ preview, original }) => {
      const img = document.createElement('img');
      img.classList.add(Gallery.#galleryImageClass);

      let imagePreview = preview;
      if (this.#options.lazy) {
        img.classList.add(Gallery.#lazyLoadClass);
        img.setAttribute('data-src', preview);
        imagePreview = this.#options.placeholder;
      }

      img.setAttribute('src', imagePreview);
      img.setAttribute('data-source', original);
      return img;
    });
  }

  /**
   * Sets 'click' event handler for the gallery on a root level
   * e.g. to the galleryRootId element from the constructor
   *
   * @param {(event: MouseEvent) => undefined} handler
   */
  addClickHandler(handler) {
    this.#galleryRoot.addEventListener('click', (event) => {
      // ignoring clicks on anything but our images
      if (!event.target.classList.contains(Gallery.#galleryImageClass)) return;

      handler(event);
    });
  }
}

export default Gallery;
