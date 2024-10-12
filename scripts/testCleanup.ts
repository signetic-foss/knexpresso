import { Knex } from "knex"; // Import Knex types

export async function cleanupDatabase(db: Knex): Promise<void> {
  await db.schema.dropTableIfExists("orders");
  await db.schema.dropTableIfExists("users");
  await db.destroy();
}
