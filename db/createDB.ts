import { Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";

const client = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.CREATE_DATABASE_URL,
    }),
  }),
});

async function createDatabase(databaseName: string): Promise<void> {
  try {
    if (!databaseName) {
      throw new Error("Database name is required.");
    }
    // Check if the database already exists
    const result =
      await sql`SELECT 1 FROM pg_database WHERE datname = ${databaseName}`.execute(
        client
      );

    if (result.rows.length > 0) {
      console.log(`Database "${databaseName}" already exists.`);
      return;
    }

    console.log(`Database does not exist. Creating database: ${databaseName}`);

    // Create the database, probably unsafe
    await sql.raw(`CREATE DATABASE "${databaseName}"`).execute(client);
    console.log(`Database "${databaseName}" created successfully.`);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    // Close the  connection to the system DB (PostgreSQL example)
    await client.destroy();
  }
}

createDatabase(process.argv[2]);
