import { Router } from "express";
import { Knex } from "knex";

export type DatabaseConfig = {
  client: "pg" | "mysql" | "sqlite3" | "mssql" | "undefined"; // Add 'sqlite3' here
  connection: {
    host?: string;
    user?: string;
    password?: string;
    database?: string;
    filename?: string; // SQLite uses `filename` instead of host, user, password
  };
  useNullAsDefault?: boolean; // Add this option for SQLite databases
};

export type Permissions = {
  read: boolean;
  write: boolean;
  delete: boolean;
};

export type TableConfig = {
  name: string;
  expose: boolean;
  permissions: Permissions;
  columns?: Record<string, string>; // Add optional columns property for specifying columns to expose
};

export type KnexpressoConfig = {
  database: DatabaseConfig;
  tables: TableConfig[];
};

export type KnexpressoDependencies = {
  db: Knex;
  router: Router;
  serverConfig: {
    port?: number;
  };
};
