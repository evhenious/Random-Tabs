const fs = require('fs');
const { opendir } = require('fs/promises');
const path = require('path');
const connect = require('@databases/sqlite');
const { sql } = require('@databases/sqlite');
const { logger } = require('../utils/logger');

const dbFileName = 'database.db';

const messages = {
  _default: 'server error',
  'NOT NULL constraint failed': 'field cannot be empty',
  'UNIQUE constraint failed': 'already registered in the system'
};

class DbHelper {
  #dbConnection;

  /**
   * Initializer for a singleton, use this as THE **main** entry point to get the instance
   * @returns {DbHelper}
   */
  static getInstance() {
    if (!this.dbHelper) {
      this.dbHelper = new DbHelper();
    }

    return this.dbHelper;
  }

  /**
   * If you want a singletion - don't call this one manually, use static **getInstance**
   */
  constructor() {
    const filePath = path.join(__dirname, dbFileName);

    let isNewDb = true;
    if (fs.existsSync(filePath)) {
      logger.log('database found!');
      isNewDb = false;
    }

    this.#dbConnection = connect(filePath);

    if (isNewDb) {
      logger.log('database not found, initializing...');
      this.initDatabase();
    }
  }

  /**
   * Reads migrations one by one in corresp. directory and applies to the database
   */
  async initDatabase() {
    const migrationsDir = path.join(__dirname, 'migrations');

    try {
      const dir = await opendir(migrationsDir);
      for await (const entry of dir) {
        if (entry.isFile()) {
          const sqlCommand = sql.file(path.join(migrationsDir, entry.name));
          await this.#dbConnection.query(sqlCommand);
          logger.log(`[${entry.name}] migration ran OK`);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  /**
   * @param {connect.SQLQuery} query
   */
  async runQuery(query) {
    try {
      return await this.#dbConnection.query(query);
    } catch (err) {
      logger.error(err.message);
      throw new Error(this.#parseDbError(err));
    }
  }

  /**
   * Parses DB errors and transforms into something readable and useable
   * @param {Error} err
   * @returns {string}
   */
  #parseDbError(err) {
    const [, description, cause] = err.message.split(':');
    const fieldName = cause?.split('.')[1];

    return `[${fieldName}] ${messages[description.trim()] || messages._default}`;
  }
}

module.exports = DbHelper;
