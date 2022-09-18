const { sql } = require('@databases/sqlite');

class UserModel {
  constructor(dbHelper) {
    this.dbHelper = dbHelper;
  }

  /**
   * @param {Object} params
   * @returns {Promise<Object[]>}
   */
  getUsers(params) {
    const query = sql`SELECT * from USERS LIMIT ${params.limit} OFFSET ${params.offset};`;
    return this.dbHelper.runQuery(query);
  }

  /**
   * @param {Object} userData
   * @returns {Promise}
   */
  findUsers(userData) {
    const conditions = Object.entries(userData).map(([key, val]) => sql`${sql.ident(key)} = ${val}`);
    const query = sql`SELECT * FROM USERS WHERE (${sql.join(conditions, ') AND (')});`;

    return this.dbHelper.runQuery(query);
  }

  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
    const fields = Object.keys(userData).map((key) => sql.ident(key));
    const values = Object.values(userData).map((val) => sql`${val}`);

    const query = sql`INSERT INTO USERS (${sql.join(fields, ', ')}) values (${sql.join(values, ', ')});`;
    await this.dbHelper.runQuery(query);

    const { name, email } = userData;
    const [user] = await this.findUsers({ name, email });
    return user;
  }

  /**
   * @param {number|string} id
   * @param {Object} userData
   * @returns {Promise}
   */
  async updateUser(id, userData) {
    const [user] = await this.findUsers({ id });
    if (!user) {
      throw new Error(`user with id [${id}] not found`);
    }

    const conditions = Object.entries(userData).map(([key, val]) => sql`${sql.ident(key)} = ${val}`);
    const query = sql`UPDATE USERS set ${sql.join(conditions, ', ')} WHERE id = ${id};`;

    return this.dbHelper.runQuery(query);
  }

  /**
   * @param {number|string} id
   * @returns {Promise}
   */
  async deleteUser(id) {
    const [user] = await this.findUsers({ id });
    if (!user) {
      throw new Error(`user with id [${id}] not found`);
    }

    const query = sql`DELETE FROM USERS WHERE id = ${id};`;
    return this.dbHelper.runQuery(query);
  }
}

module.exports = UserModel;
