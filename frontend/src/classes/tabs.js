/**
 * @typedef TabConfig
 * @type {Object}
 * @property {string} name - tab name
 * @property {Mountable} item - class element to init in tab.
 * @property {boolean} [default] - if tab should be active by default
 * @property {[]} [args]
 */

import { saveToStorage } from "../helpers/storage";

/**
 * Class responsible for rendering tab group on the page.
 */
class Tabs {
  #tabButtons;
  #tabContents;

  /**
   * @param {string} rootId
   * @param {TabConfig[]} tabsConfig
   */
  constructor(rootId = '', tabsConfig = []) {
    this.#tabButtons = tabsConfig.map((tab, index) => {
      const btn = document.createElement('button');
      btn.innerText = tab.name;
      btn.setAttribute('data-id', index);
      btn.setAttribute('data-name', tab.name);
      btn.classList.add('tablinks');

      if (tab.default) {
        btn.classList.add('default-active');
      }
      return btn;
    });

    this.#tabContents = tabsConfig.map(({ item: TabContentItem, args = [] }, index) => {
      const tabItem = document.createElement('div');
      tabItem.setAttribute('id', index);
      tabItem.classList.add('tabcontent');

      new TabContentItem(tabItem, ...args);
      return tabItem;
    });

    const tabContentRoot = document.createElement('div');
    tabContentRoot.setAttribute('id', 'tabs');
    tabContentRoot.append(...this.#tabContents);

    const tabButtonRoot = document.getElementById(rootId);
    tabButtonRoot.append(...this.#tabButtons);
    tabButtonRoot.insertAdjacentElement('afterend', tabContentRoot);

    tabButtonRoot.addEventListener('click', this.#selectTab.bind(this));
    tabButtonRoot.querySelectorAll('button.default-active')[0]?.click();
  }

  /**
   * @param {MouseEvent} event
   */
  #selectTab(event) {
    if (!event.target.classList.contains('tablinks')) {
      return;
    }

    // reset active status for all buttons and set the clicked one as active
    this.#tabButtons.forEach((btn) => btn.classList.remove('active'));
    event.target.classList.add('active');

    this.#tabContents.forEach((element) => (element.style.display = 'none'));

    const { id: tabId, name: tabName } = event.target.dataset;
    this.#tabContents.find((div) => div.id === tabId).style.display = 'block';

    saveToStorage('lastTab', tabName);
  }
}

/**
 * Abstract class, serves as a base for any class we want to be rendered as a Tab content
 */
class Mountable {
  constructor(parentElem, rootId) {
    const root = document.createElement('div');
    root.setAttribute('id', rootId);
    parentElem.append(root);

    this.root = root;
  }
}

export { Tabs, Mountable };
