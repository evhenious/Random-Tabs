import { getImages } from '../helpers/networkHelper';
import { Mountable } from './tabs';

const defaultPageParams = {
  limit: 10,
};

class Gallery extends Mountable {
  static #galleryImageClass = 'gallery-item';
  static #lazyLoadClass = 'lazyload';

  #options;
  #buttonRoot;

  /**
   * @param {HTMLElement} parent
   * @param {Object} options
   * @param {Function} [imageClickHandler]
   */
  constructor(parent, options = {}, imageClickHandler) {
    super(parent, 'gallery');
    this.#options = { ...options };

    // init root element
    const root = document.createElement('div');
    root.setAttribute('id', 'gallery');
    parent.append(root);

    this.#buttonRoot = document.createElement('div');
    this.#buttonRoot.classList.add('button-root');
    this.root.insertAdjacentElement('afterend', this.#buttonRoot);

    // to load first page automatically on gallery init
    this.#loadGalleryPage();

    if (imageClickHandler) {
      this.addClickHandler(imageClickHandler);
    }
  }

  /**
   * Triggers data fetch from Lorem Picsum.
   * After getting the page, replaces current images with new ones,
   * and refreshes nav buttons in **#buttonRoot** (see **createNavigationButtons** method)
   *
   * @param {Object} pageParams
   */
  #loadGalleryPage(pageParams = defaultPageParams) {
    getImages(pageParams).then((responseData) => {
      const { picturesData, pageLinks } = responseData;

      this.root.replaceChildren(...this.#createGalleryImages(picturesData));

      this.#createNavigationButtons(pageLinks);
    });
  }

  /**
   * Dynamically create nav buttons. _prev_ or _next_ key in incoming object are totally
   * optional, it depends on what nav links for current page we got from the backend
   *
   * @param {Object} pageLinks
   * @param {string} [pageLinks.prev]
   * @param {string} [pageLinks.next]
   */
  #createNavigationButtons(pageLinks) {
    const navigationBtns = Object.entries(pageLinks).map(([key, url]) => {
      const btn = document.createElement('button');
      btn.classList.add(key);
      btn.innerText = `Load ${key} Page`;

      btn.addEventListener('click', this.#loadGalleryPage.bind(this, { url }));

      return btn;
    });

    this.#buttonRoot.replaceChildren(...navigationBtns);
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
    this.root.addEventListener('click', (event) => {
      // ignoring clicks on anything but our images
      if (!event.target.classList.contains(Gallery.#galleryImageClass)) return;

      handler(event);
    });
  }
}

export default Gallery;
