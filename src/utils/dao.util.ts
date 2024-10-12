import knex, { Knex, QueryBuilder } from "knex";
import { KNEXPRESSO_LOGGER } from "./logger.util";
import assert from "assert";
import { getKnexConnection } from "./connection.util";

function getSelectQuery(
  tableName: string,
  whereCondition: Record<string, any> = {},
  columns: { [x: string]: any },
  limit: number = 100,
): knex.QueryBuilder {
  if (Object.keys(whereCondition).length === 0) {
    whereCondition = {};
  }

  const query = getKnexConnection()
    .select(
      Object.keys(columns).map((dbCol) => `${columns[dbCol]} as ${dbCol}`),
    )
    .from(tableName)
    .where(whereCondition)
    .limit(limit);

  return query;
}

function getCountQuery(
  tableName: string,
  whereCondition: Record<string, any>,
): knex.QueryBuilder {
  const query = getKnexConnection().count("* as count").from(tableName);

  // Only apply the `where` condition if it exists
  if (Object.keys(whereCondition).length > 0) {
    query.where(whereCondition);
  }

  return query;
}

// Helper function to create an EXISTS query
function getExistsQuery(
  tableName: string,
  whereCondition: Record<string, any>,
): knex.QueryBuilder {
  assert(
    Object.keys(whereCondition).length > 0,
    "whereCondition cannot be empty",
  );

  const query = getKnexConnection()
    .select(1)
    .from(tableName)
    .where(whereCondition)
    .limit(1);

  return query;
}

async function executeWithLogging(
  query: knex.QueryBuilder | any,
  queryType: string,
): Promise<any> {
  try {
    return await query;
  } catch (error) {
    // Check if the `toSQL` method exists on the query using bracket notation
    if (typeof query["toSQL"] === "function") {
      try {
        const nativeQuery = query["toSQL"]().toNative();
        KNEXPRESSO_LOGGER.error(
          `[database_error]: ${queryType} query failed. SQL: ${nativeQuery.sql}`,
        );
      } catch (loggingError) {
        // Handle any issues that arise during logging
        KNEXPRESSO_LOGGER.error(
          `[database_error]: ${queryType} query failed, but SQL could not be retrieved.`,
        );
      }
    } else {
      KNEXPRESSO_LOGGER.error(
        `[database_error]: ${queryType} query failed, and the SQL could not be logged.`,
      );
    }
    throw error;
  }
}

export interface EntityDAO {
  executeSelect(
    tableName: string,
    whereCondition: Record<string, any>,
    columns: { [x: string]: any },
    limit?: number,
  ): Promise<any[]>;
  executeCount(
    tableName: string,
    whereCondition: Record<string, any>,
  ): Promise<number>;
  executeExists(
    tableName: string,
    whereCondition: Record<string, any>,
  ): Promise<boolean>;
}

export function getQueryBuilder(
  knex: knex.Knex,
  tableName: string,
): QueryBuilder {
  return knex.queryBuilder().table(tableName);
}

export function getDao(knex: knex.Knex): EntityDAO {
  return {
    async executeSelect(
      tableName: string,
      whereCondition: Record<string, any>,
      columns: { [x: string]: any },
      limit: number = 100,
    ): Promise<any[]> {
      const query = getSelectQuery(tableName, whereCondition, columns, limit);
      return executeWithLogging(query, "SELECT");
    },

    async executeCount(
      tableName: string,
      whereCondition: Record<string, any>,
    ): Promise<number> {
      const query = getCountQuery(tableName, whereCondition);
      const result = await executeWithLogging(query, "COUNT");
      return typeof result[0].count === "string"
        ? parseInt(result[0].count, 10)
        : result[0].count;
    },

    async executeExists(
      tableName: string,
      whereCondition: Record<string, any>,
    ): Promise<boolean> {
      const query = getExistsQuery(tableName, whereCondition);
      const result = await executeWithLogging(query, "EXISTS");
      return result.length > 0;
    },
  };
}
