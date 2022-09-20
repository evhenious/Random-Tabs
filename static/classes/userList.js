import { Mountable } from './tabs';

class UserList extends Mountable {
  #tableRows = [];

  /**
   * @param {HTMLElement} parent
   * @param {Object} config
   */
  constructor(parent, config = {}) {
    super(parent, 'userlist');

    const header = this.#makeHeader(config);
    const footer = this.#makeFooter();

    this.root.append(header, this.#tableRows, footer);
  }

  /**
   * Prepares table header with column titles,
   * according to names and order in supplied **config**
   * @param {Object} config
   * @returns {HTMLDivElement[]}
   */
  #makeHeader({ columns = [] }) {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('userlist-header');

    columns.forEach(({ title }) => {
      const colTitle = document.createElement('div');
      colTitle.innerText = title;
      headerDiv.append(colTitle);
    });

    return headerDiv;
  }

  #makeFooter() {
    const footerDiv = document.createElement('div');
    footerDiv.classList.add('userlist-footer');

    footerDiv.innerText = 'here is a footer';
    return footerDiv;
  }
}

export default UserList;
