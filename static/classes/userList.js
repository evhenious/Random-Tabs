import { Mountable } from './tabs';
import { userApi as api } from '../helpers/networkHelper';

const editIcon = '&#9998;'; // pencil
const removeIcon = '&#9760;'; // :)

const contextMenuItems = [
  {
    name: `${editIcon} Edit`,
    handler: (userId) => {
      console.log(`Edit user ${userId}`);
    },
  },
  {
    name: `${removeIcon} Delete`,
    handler: (userId) => {
      console.log(`Delete user ${userId}`);
    },
  },
];

class UserList extends Mountable {
  #menu = null;
  #config = {};
  #tableRows = document.createElement('div');

  /**
   * @param {HTMLElement} parent
   * @param {Object} config
   */
  constructor(parent, config = {}) {
    super(parent, 'userlist');

    this.#config = config;

    const header = this.#makeHeader();
    const footer = this.#makeFooter();

    // generic click handler for all data rows
    this.#tableRows.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const userId = event.target.parentElement.dataset.userId;
      const position = {
        top: event.y - 5,
        left: event.x - 5,
      };

      this.#contextMenu(userId, position);
    });

    this.#tableRows.classList.add('userlist-rows');
    api.fetchUsers().then((data) => this.#tableRows.append(...this.#generateRows(data)));

    this.root.append(header, this.#tableRows, footer);
  }



  /**
   * Prepares table header with column titles,
   * according to names and order in supplied **config**
   * @returns {HTMLDivElement[]}
   */
  #makeHeader() {
    const { columns = [] } = this.#config;
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

  /**
   * @param {string|number} userId
   * @param {{ x: number, y: number }} position
   */
  #contextMenu(userId, position) {
    // if it's not the first time menu appears - we will not recreate all elements again,
    // just update position and user context
    if (!this.#menu) {
      this.#menu = document.createElement('div');
      this.#menu.id = 'context-menu';
    }
    this.#menu.style = `top: ${position.top}px; left: ${position.left}px`;
    this.#menu.classList.remove('hidden');

    const items = contextMenuItems.map((item) => {
      const btn = document.createElement('div');
      btn.innerHTML = item.name;
      btn.addEventListener('click', () => {
        this.#menu.classList.add('hidden');
        item.handler(userId);
      });
      return btn;
    });

    const idText = document.createElement('h3');
    idText.innerText = `User ${userId}`;
    this.#menu.replaceChildren(idText, ...items);

    // we want to hide the context menu when mouse leaves it
    this.#menu.addEventListener('mouseleave', () => this.#menu.classList.add('hidden'));

    this.root.append(this.#menu);
  }

  /**
   * Generates cells for a single row (one row = one user data)
   * @param {Object} userData
   * @returns {HTMLDivElement[]}
   */
  #generateRowCells(userData) {
    const cells = [];

    this.#config.columns.forEach((col) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = userData[col.id];
      cells.push(cell);
    });

    return cells;
  }

  /**
   * Generates data rows for the table
   * @param {Object[]} users
   * @returns {HTMLDivElement[]}
   */
  #generateRows(users) {
    return users.map((userData) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-user-id', userData.id);
      row.append(...this.#generateRowCells(userData));
      return row;
    });
  }
}

export default UserList;
