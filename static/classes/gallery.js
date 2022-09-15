import { getImages } from "../helpers/networkHelper";

class Gallery {
  static #galleryImageClass = 'gallery-item';
  static #lazyLoadClass = 'lazyload';

  #galleryRoot;
  #options;

  #pageIndex = 1;
  #pageLimit = 10;

  constructor(galleryRootId = '', options = {}) {
    this.#options = {...options};

    // init root element
    this.#galleryRoot = document.querySelector(galleryRootId);

    // button to LOAD MOAR!
    const loadMoarBtn = document.createElement('button');
    loadMoarBtn.innerText = 'Load Next Page';
    loadMoarBtn.addEventListener('click', () => {
      this.#pageIndex += 1;
      this.#getPageOfImages();
    });
    this.#galleryRoot.insertAdjacentElement('afterend', loadMoarBtn);

    // to load 1 page
    this.#getPageOfImages();
  }

  #getPageOfImages() {
    const params = new URLSearchParams();
    params.set('page', this.#pageIndex);
    params.set('limit', this.#pageLimit);

    getImages(params).then((processedData) => {
      this.#galleryRoot.append(...this.#createGalleryImages(processedData));
    });
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
