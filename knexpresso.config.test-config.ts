import { KnexpressoConfig } from "./src/types/knexConfig.type";

export default {
  database: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
  },
  tables: [
    {
      name: "users",
      expose: true,
      permissions: {
        read: true,
        write: true,
        delete: true,
      },
      columns: {
        id: "id",
        name: "name",
        email: "email",
      },
    },
    {
      name: "orders",
      expose: true,
      permissions: {
        read: true,
        write: true,
        delete: false,
      },
      columns: {
        id: "id",
        amount: "amount",
        user_id: "user_id",
      },
    },
    {
      name: "addresses",
      expose: true,
      permissions: {
        read: true,
        write: true,
        delete: false,
      },
    },
  ],
} as KnexpressoConfig;
