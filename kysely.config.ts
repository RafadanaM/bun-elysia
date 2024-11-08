import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";
import dbClient from "./db/client";

export default defineConfig({
  kysely: dbClient.getInstance().db,
  migrations: {
    allowJS: true,
    migrationFolder: "/db/migrations",
    getMigrationPrefix: getKnexTimestampPrefix,
  },
  seeds: {
    seedFolder: "/db/seeds",
  },
});
