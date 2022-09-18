const fs = require('fs');
const { opendir } = require('fs/promises');
const path = require('path');
const connect = require('@databases/sqlite');
const { sql } = require('@databases/sqlite');
const { logger } = require('../utils/logger');

const dbFileName = 'our_best_db';

const messages = {
  'NOT NULL constraint failed': 'field cannot be empty',
  'UNIQUE constraint failed': 'already registered in the system'
};

class DbHelper {
  #db;

  /**
   * Initializer for a singleton, **main** entry point to get the instance
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
    let filePath = path.join(__dirname, dbFileName);

    let isNewDb = true;
    if (fs.existsSync(filePath)) {
      logger.log('database found!');
      isNewDb = false;
    }

    this.#db = connect(filePath);

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
      for await (const dirent of dir) {
        if (dirent.isFile()) {
          const sqlCommand = sql.file(path.join(migrationsDir, dirent.name));
          await this.#db.query(sqlCommand);
          logger.log(`${dirent.name} migration ran OK`);
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
      return await this.#db.query(query);
    } catch (err) {
      logger.error(err.message);
      const [type, description, cause] = err.message.split(':');

      throw new Error(`[${cause?.split('.')[1]}] ${messages[description.trim()] || description.trim()}`);
    }
  }
}

module.exports = DbHelper;
