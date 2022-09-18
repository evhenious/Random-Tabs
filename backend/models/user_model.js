const { sql } = require('@databases/sqlite');
const { logger } = require('../utils/logger');

class UserModel {
  constructor(dbHelper) {
    this.dbHelper = dbHelper;
  }

  /**
   * @returns {Promise<Object[]>}
   */
  async getUsers() {
    const query = sql`SELECT * from USERS;`;
    return this.dbHelper.runQuery(query);
  }

  /**
   * @param {Object} userData
   * @returns {Promise}
   */
  async findUsers(userData) {
    const conditions = Object.entries(userData).map(([key, val]) => sql`${sql.ident(key)} = ${val}`);
    const query = sql`SELECT * FROM USERS WHERE (${sql.join(conditions, ') AND (')})`;

    return this.dbHelper.runQuery(query);
  }

  /**
   * @param {Object} userData
   * @returns {Promise}
   */
  async createUser(userData) {
    const { name, email, phone } = userData;
    const query = sql`INSERT INTO USERS (name, email, phone) values (${name}, ${email}, ${phone});`;
    await this.dbHelper.runQuery(query);

    const user = await this.findUsers({ name, email });
    return user;
  }

  /**
   *
   * @param {number} id
   */
  async deleteUser(id) {

  }
}

module.exports = UserModel;
