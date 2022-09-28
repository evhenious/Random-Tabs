import { sql } from '@databases/sqlite';
import { DatabaseAccess, iParsedQuery, iUser } from '../interfaces';

class UserModel {
  private dbHelper;

  constructor(dbHelper: DatabaseAccess) {
    this.dbHelper = dbHelper;
  }

  /**
   * Get list of users. Pagination is possible
   */
  async getUsers(params: iParsedQuery) {
    const getUsersQuery = sql`SELECT * from USERS LIMIT ${params.limit} OFFSET ${params.offset};`;
    const countQuery = sql`SELECT COUNT(id) from USERS;`;

    const resp: { users: iUser[]; total: number } = {
      users: [],
      total: 0,
    };

    await Promise.allSettled([
      this.dbHelper.runQuery(getUsersQuery)
        .then((data: iUser[]) => (resp.users = data)),
      this.dbHelper.runQuery(countQuery)
        .then((data) => (resp.total = data[0]['COUNT(id)'])),
    ]);

    return resp;
  }

  /**
   * Find user(s) by given criteria
   */
  findUsersBy(userData: Partial<iUser>) {
    const conditions = Object.entries(userData).map(([key, val]) => sql`${sql.ident(key)} = ${val}`);
    const query = sql`SELECT * FROM USERS WHERE (${sql.join(conditions, ') AND (')});`;

    return this.dbHelper.runQuery(query) as unknown as iUser[];
  }

  /**
   * Creates new user
   */
  async createUser(userData: iUser) {
    const fields = Object.keys(userData).map((key) => sql.ident(key));
    const values = Object.values(userData).map((val) => sql`${val}`);

    const query = sql`INSERT INTO USERS (${sql.join(fields, ', ')}) values (${sql.join(values, ', ')});`;
    await this.dbHelper.runQuery(query);

    const { name, email } = userData;
    const [user] = await this.findUsersBy({ name, email });
    return user;
  }

  /**
   * Updates existing user data
   */
  async updateUser(id: string, userData: Partial<iUser>) {
    const [user] = await this.findUsersBy({ id });
    if (!user) {
      throw new Error(`user with id [${id}] not found`);
    }

    const conditions = Object.entries(userData).map(([key, val]) => sql`${sql.ident(key)} = ${val}`);
    const query = sql`UPDATE USERS set ${sql.join(conditions, ', ')} WHERE id = ${id};`;

    return this.dbHelper.runQuery(query) as unknown as iUser;
  }

  /**
   * Deletes user from the db
   */
  async deleteUser(id: string) {
    const [user] = await this.findUsersBy({ id });
    if (!user) {
      throw new Error(`user with id [${id}] not found`);
    }

    const query = sql`DELETE FROM USERS WHERE id = ${id};`;
    return this.dbHelper.runQuery(query);
  }
}

export default UserModel;
