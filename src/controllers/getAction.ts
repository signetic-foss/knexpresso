// src/controllers/getAction.ts

import { Request, Response, NextFunction } from "express";
import { EntityDAO } from "../utils/dao.util";
import { sendSuccessResponse } from "../server/responseHelper";
import { KNEXPRESSO_LOGGER } from "../utils/logger.util";

/**
 * Fetches records from a specified table and returns them in the response.
 *
 * @param dao - The data access object to interact with the database.
 * @param tableName - The name of the table to query.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function for error handling.
 */
export async function fetchRecords(
  dao: EntityDAO,
  tableName: string,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { limit, ...filterParams } = req.query;
  const safeLimit = limit ? parseInt(limit as string, 10) : 100;

  try {
    KNEXPRESSO_LOGGER.info(
      `Fetching records from ${tableName} with filters: ${JSON.stringify(filterParams)}`,
    );
    const records = await dao.executeSelect(
      tableName,
      filterParams,
      {},
      safeLimit,
    );
    KNEXPRESSO_LOGGER.info(`Successfully retrieved records from ${tableName}`);
    sendSuccessResponse(
      res,
      records,
      `${tableName} records retrieved successfully`,
    );
  } catch (error: any) {
    KNEXPRESSO_LOGGER.error(
      `Error fetching records from ${tableName}: ${error.message}`,
    );
    next(error); // Pass the error to the next middleware
  }
}

/**
 * Checks if any records exist in the table based on the query parameters.
 *
 * @param dao - The data access object to interact with the database.
 * @param tableName - The name of the table to query.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function for error handling.
 */
export async function checkExists(
  dao: EntityDAO,
  tableName: string,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { exists, ...filterParams } = req.query; // Destructure `exists` so it isn't passed as a filter

  try {
    KNEXPRESSO_LOGGER.info(
      `Checking if records exist in ${tableName} with filters: ${JSON.stringify(filterParams)}`,
    );
    const existsResult = await dao.executeExists(tableName, filterParams); // Only use valid filters
    KNEXPRESSO_LOGGER.info(`Exists result for ${tableName}: ${existsResult}`);
    sendSuccessResponse(
      res,
      { exists: existsResult },
      "Exists check completed",
    );
  } catch (error: any) {
    KNEXPRESSO_LOGGER.error(
      `Error checking if records exist in ${tableName}: ${error.message}`,
    );
    next(error);
  }
}

/**
 * Counts the number of records in the table based on the query parameters.
 *
 * @param dao - The data access object to interact with the database.
 * @param tableName - The name of the table to query.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function for error handling.
 */
export async function countRecords(
  dao: EntityDAO,
  tableName: string,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { count, ...filterParams } = req.query; // Destructure `count` to remove it from filters

  try {
    KNEXPRESSO_LOGGER.info(
      `Counting records in ${tableName} with filters: ${JSON.stringify(filterParams)}`,
    );
    const countResult = await dao.executeCount(tableName, filterParams); // Only use valid filters
    KNEXPRESSO_LOGGER.info(`Count result for ${tableName}: ${countResult}`);
    sendSuccessResponse(res, { count: countResult }, "Count query completed");
  } catch (error: any) {
    KNEXPRESSO_LOGGER.error(
      `Error counting records in ${tableName}: ${error.message}`,
    );
    next(error);
  }
}
