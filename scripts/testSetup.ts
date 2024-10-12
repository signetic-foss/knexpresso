import { Knex } from "knex"; // Import Knex types

export async function setupDatabase(db: Knex): Promise<void> {
  console.log("Creating Users");
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
  });

  console.log("Creating Orders");
  await db.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.float("amount").notNullable();
  });

  console.log("Creating Addresses");
  await db.schema.createTable("addresses", (table) => {
    table.increments("id").primary();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.integer("user_id").notNullable().references("id").inTable("users");
  });

  console.log("Inserting Users");
  await db("users").insert([
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ]);

  console.log("Inserting Orders");
  await db("orders").insert([
    { user_id: 1, amount: 250.0 },
    { user_id: 2, amount: 150.5 },
  ]);

  console.log("Inserting Addresses");
  await db("addresses").insert([
    { street: "123 Main St", city: "Wonderland", user_id: 1 },
    { street: "456 Elm St", city: "Springfield", user_id: 2 },
  ]);

  console.log("Database setup complete");
}
