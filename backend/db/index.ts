import { DatabaseAccess } from '../interfaces';

import connect, { sql, SQLQuery } from '@databases/sqlite';
import fs from 'fs';
import { opendir } from 'fs/promises';
import path from 'path';

import { logger } from '../utils/logger';

const dbFileName = 'database.db';

type dbMessages = {
  _default: string;
  [key: string]: string;
};

const messages: dbMessages = {
  _default: 'server error',
  'NOT NULL constraint failed': 'field cannot be empty',
  'UNIQUE constraint failed': 'already registered in the system',
  'no such column': 'field is not supported',
};

class DbHelper implements DatabaseAccess {
  private static dbHelper: DbHelper;

  private dbConnection;

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
  private constructor() {
    const filePath = path.join(__dirname, dbFileName);

    let isNewDb = true;
    if (fs.existsSync(filePath)) {
      logger.log('database found!');
      isNewDb = false;
    }

    this.dbConnection = connect(filePath);

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
          await this.dbConnection.query(sqlCommand);
          logger.log(`[${entry.name}] migration ran OK`);
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  /**
   * Closes DB connection
   */
  disconnect() {
    return this.dbConnection.dispose();
  }

  /**
   * Runs prepared SQLQuery against the db.
   * Will log any db errors and throw more readable versions
   */
  async runQuery(query: SQLQuery) {
    try {
      return await this.dbConnection.query(query);
    } catch (err) {
      logger.error((err as Error).message);
      throw new Error(this.#parseDbError(err as Error));
    }
  }

  /**
   * Parses DB errors and transforms into something readable and useable
   */
  #parseDbError(err: Error) {
    const [type, description, cause] = err.message.split(':');

    const fieldName = type === 'SQLITE_ERROR' ? cause : cause?.split('.')[1];

    return `[${fieldName.trim()}] ${messages[description.trim()] || messages._default}`;
  }
}

export default DbHelper;
