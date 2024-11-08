import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { DB } from "./db.d.ts";

class DBClient {
  #db: Kysely<DB>;
  private static instance: DBClient;

  private constructor() {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20,
      }),
    });

    this.#db = new Kysely<DB>({ dialect, plugins: [new CamelCasePlugin()] });
  }

  public static getInstance(): DBClient {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }

  get db() {
    return this.#db;
  }
}

export default DBClient;
