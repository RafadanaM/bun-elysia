import dbClient from "@db/client";

class UsersService {
  #db;
  constructor(db: dbClient["db"]) {
    this.#db = db;
  }

  async getUsers() {
    return await this.#db.selectFrom("users").selectAll().execute();
  }
}

export default UsersService;
