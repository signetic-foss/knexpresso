import { Router } from "express";
import knex from "knex";
import { KnexpressoConfig } from "../types/knexConfig.type";
import { EntityDAO, getDao } from "../utils/dao.util";
import {
  fetchRecords,
  checkExists,
  countRecords,
} from "../controllers/getAction";

export function generateRoutes(
  router: Router,
  db: knex.Knex,
  config: KnexpressoConfig,
) {
  const dao: EntityDAO = getDao(db);

  config.tables.forEach((tableConfig) => {
    if (!tableConfig.expose) {
      return;
    }

    const tableName = tableConfig.name;

    // GET Endpoint for reading records, counting, or checking existence
    router.get(`/${tableName}`, async (req, res, next) => {
      if (req.query.exists) {
        await checkExists(dao, tableName, req, res, next);
      } else if (req.query.count) {
        await countRecords(dao, tableName, req, res, next);
      } else {
        await fetchRecords(dao, tableName, req, res, next);
      }
    });
  });
}
