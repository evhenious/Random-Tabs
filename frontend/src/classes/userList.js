import { Mountable } from './tabs';
import { userApi as api } from '../helpers/networkHelper';
import { getModalInstance } from '../helpers/modal';
import getEditUserForm from '../helpers/userEditForm';

const editIcon = '&#9998;'; // pencil
const removeIcon = '&#9760;'; // jolly roger

/**
 * @typedef ContextMenuItem
 * @type {Object}
 * @property {string} name menu item name, will be displayed on the screen
 * @property {ClickHandler} handler main click handler
 */

/**
 * buttons in context menu are described here
 * @type {ContextMenuItem[]}
 * */
const contextMenuItems = [
  {
    name: `${editIcon} Edit`,
    // callback Kung-Fu as it is
    handler: (userId, lastAction) => {
      console.log(`Edit user ${userId}`);
      api.getUserById(userId).then((userData) => {
        const onFormSave = (editedUserData) => {
          api.updateUser(userId, editedUserData).then(() => {
            getModalInstance().instance.close();
            lastAction();
          });
        };
        const formConfig = {
          buttonText: 'Save Changes',
          title: 'Edit User Details'
        };
        const form = getEditUserForm(onFormSave, userData, formConfig);
        getModalInstance().showModal(form);
      });
    },
  },
  {
    name: `${removeIcon} Delete`,
    handler: (userId, lastAction) => {
      console.warn(`Delete user ${userId}`);
      api.deleteUser(userId).then(lastAction);
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
    this.#refreshTableData();

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

    // small callback to be executed after successful user creation
    const afterCreate = () => {
      getModalInstance().instance.close(); // hide modal
      this.#refreshTableData(true);
    };

    createBtn.addEventListener('click', () => {
      // make new users, not war
      const createUserFn = (userData) => {
        console.warn('create user');
        api.createUser(userData).then(afterCreate);
      };

      const editForm = getEditUserForm(createUserFn);
      getModalInstance().showModal(editForm);
    });

    footerDiv.append(createBtn);

    return footerDiv;
  }

  /**
   * Re-fetches user list data from API and re-sets tabe rows based on new data
   * @param {boolean} isUpdate FALSE for append, TRUE for replace rows
   */
  #refreshTableData(isUpdate = false) {
    const method = isUpdate ? 'replaceChildren' : 'append';
    api.getUsersList().then((data) => this.#tableRows[method](...this.#generateRows(data)));
  }

  /**
   * Shows context menu with menu iems based on config in **contextMenuItems**
   * @param {string|number} userId clicked user id
   * @param {{ x: number, y: number }} position menu position (top-left corner coords)
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

    const lastAction = () => {
      this.#refreshTableData(true);
    };

    // transforming config into menu items
    const menuItems = contextMenuItems.map((item) => {
      const btn = document.createElement('div');
      btn.innerHTML = item.name;
      btn.addEventListener('click', () => {
        this.#menu.classList.add('hidden'); // hiding context menu itself
        item.handler(userId, lastAction);
      });
      return btn;
    });

    const idText = document.createElement('h3');
    idText.innerText = `User# ${userId}`;
    this.#menu.replaceChildren(idText, ...menuItems);

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
