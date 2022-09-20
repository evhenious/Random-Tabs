import { Mountable } from './tabs';
import { userApi as api } from '../helpers/networkHelper';
import { getModalInstance } from '../helpers/modal';

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
    handler: (userId, callback) => {
      console.warn(`Delete user ${userId}`);
      api.deleteUser(userId).then(callback);
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

    const createBtn = document.createElement('button');
    createBtn.innerText = 'Create User';
    createBtn.addEventListener('click', () => {
      // make new users, not war
      const createFn = (event) => {
        event.preventDefault();

        const form = event.target.parentElement;
        const userData = {
          name: form.elements[0].value,
          email: form.elements[1].value,
          phone: form.elements[2].value,
        };

        console.log(userData);
        const afterCreate = () => {
          getModalInstance().instance.close(); // hide modal
          api.fetchUsers()
            .then((data) => this.#tableRows.replaceChildren(...this.#generateRows(data)));
        };

        console.warn('create user');
        api.createUser(userData).then(afterCreate);
      };

      const editForm = makeEditUserForm(createFn);
      getModalInstance().showModal(editForm);
    });

    footerDiv.append(createBtn);

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
      // we want to hide the context menu when mouse leaves it
      this.#menu.addEventListener('mouseleave', () => this.#menu.classList.add('hidden'));
    }
    this.#menu.style = `top: ${position.top}px; left: ${position.left}px`;
    this.#menu.classList.remove('hidden');

    const items = contextMenuItems.map((item) => {
      const btn = document.createElement('div');
      btn.innerHTML = item.name;
      btn.addEventListener('click', () => {
        this.#menu.classList.add('hidden');

        const afterDelete = () => {
          api.fetchUsers()
            .then((data) => this.#tableRows.replaceChildren(...this.#generateRows(data)));
        };

        item.handler(userId, afterDelete);
      });
      return btn;
    });

    const idText = document.createElement('h3');
    idText.innerText = `User# ${userId}`;
    this.#menu.replaceChildren(idText, ...items);

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

function makeEditUserForm (onCreate) {
  const form = document.createElement('form');
  form.classList.add('user-edit-form');

  const nameInput = document.createElement('input');
  nameInput.id = 'user-name';
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'user-name');
  nameLabel.innerText = 'User Name';

  const emailInput = document.createElement('input');
  emailInput.id = 'user-email';
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'user-email');
  emailLabel.innerText = 'User Email Address';

  const phoneInput = document.createElement('input');
  phoneInput.id = 'user-phone';
  const phoneLabel = document.createElement('label');
  phoneLabel.setAttribute('for', 'user-phone');
  phoneLabel.innerText = 'User Tel #';

  const btn = document.createElement('button');
  btn.innerText = 'create';
  btn.addEventListener('click', onCreate);

  form.append(nameLabel, nameInput, emailLabel, emailInput, phoneLabel, phoneInput, btn);

  return form;
}



export default UserList;
