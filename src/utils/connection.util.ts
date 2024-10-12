import knex, { Knex } from "knex";
import { KnexpressoConfig } from "../types/knexConfig.type";
import assert from "assert";

let knexObject: knex.Knex | undefined = undefined;

// Use Knex.Config instead of knex.Config
export function getKnexConnection(config?: KnexpressoConfig): Knex {
  if (!knexObject) {
    assert(
      !!config,
      "config is required when getKnexConnection is first called",
    );

    // Use the Knex.Config type
    const knexConfig: Knex.Config = {
      client: config.database.client,
      connection: config.database.connection,
    };

    if (config.database.client === "sqlite3") {
      knexConfig.useNullAsDefault = config.database.useNullAsDefault ?? true;
    }

    knexObject = knex(knexConfig); // Initialize knex instance
  }

  return knexObject;
}
