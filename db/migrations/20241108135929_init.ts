import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("first_name", "varchar", (col) => col.notNull())
    .addColumn("last_name", "varchar")
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("profile_picture", "varchar")
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createIndex("users_email_id_index")
    .on("users")
    .columns(["email", "id"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations

  await db.schema.dropTable("users").execute();
}
