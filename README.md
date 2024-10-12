# Knexpresso

**Knexpresso** is a lightweight Node.js application built with Express and Knex, designed for creating REST APIs that interface with various SQL databases. This project is built to quickly scaffold database-driven APIs using Knex as the query builder. It supports different database engines such as PostgreSQL, SQLite, MySQL, and more.

## Features

- **Database agnostic**: Works with various databases (PostgreSQL, SQLite, etc.) by configuring Knex.
- **Auto-generated REST endpoints**: Define tables and CRUD permissions in a config file to expose them via REST API.
- **Extensible**: Add more endpoints, extend database schemas, and modify permissions easily.
- **Testable**: Includes automated tests with Jest and Supertest.
- **Lightweight & Fast**: Designed for small to medium projects where simplicity and speed are key.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Scripts](#scripts)
- [License](#license)

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v18+ recommended)
- PostgreSQL (or any other database you plan to use)
- **pnpm** (the package manager)

You can install `pnpm` using:

```bash
npm install -g pnpm
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/knexpresso.git
   cd knexpresso
   ```

2. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

3. Set up your PostgreSQL database or use another supported database. Modify the connection settings in the `knexpresso.json` or use the SQLite configuration provided in the `test-config.ts`.

## Configuration

### knexpresso.json

This is the primary configuration file that Knexpresso uses to understand the database structure, table permissions, and other server configurations.

```json
{
  "database": {
    "client": "pg",
    "connection": {
      "host": "localhost",
      "user": "knexpresso",
      "password": "knexpresso_password",
      "database": "knexpresso_db"
    }
  },
  "tables": [
    {
      "name": "users",
      "expose": true,
      "permissions": {
        "read": true,
        "write": true,
        "delete": false
      }
    },
    {
      "name": "orders",
      "expose": true,
      "permissions": {
        "read": true,
        "write": false,
        "delete": false
      }
    }
  ]
}
```

- **Database Configuration**: Defines the database engine (e.g., PostgreSQL, SQLite) and connection details.
- **Tables**: List the tables exposed by the API. You can set permissions (`read`, `write`, `delete`) per table.

### knexConfig.type.ts

This file defines TypeScript types for the configuration structure used by Knexpresso. It ensures consistency and proper validation of the database and table configurations.

## Usage

### Running the Server

Start the server using the following command:

```bash
pnpm start
```

This will start the Knexpresso server on the default port `3000` (or a custom port if configured). The server will automatically expose the routes based on the table configurations.

### Customizing Configuration

To customize the configuration file path or specify a custom port, use the following:

```bash
pnpm start --config ./path/to/custom-config.json --port 4000
```

### API Endpoints

Once the server is running, Knexpresso automatically generates RESTful endpoints for all tables listed in the config file. For example, for the `users` table:

- **GET** `/api/users` - Fetch all users
- **GET** `/api/users?id=1` - Fetch user with ID 1

You can extend the API further by adding new controllers and routes in the `/src/controllers/` and `/src/server/routes.ts` files.

## Testing

Knexpresso includes unit and integration tests using Jest and Supertest to ensure API functionality. Tests are defined in the `tests/` directory.

To run tests, execute:

```bash
pnpm test
```

### Curl Tests

For basic testing of API endpoints, you can use the provided `curl-tests.sh` script.

```bash
./scripts/curl-tests.sh
```

This script runs a series of basic API calls to ensure the server is correctly handling the main endpoints.

## Scripts

- **`pnpm start`**: Starts the Knexpresso server.
- **`pnpm test`**: Runs all tests using Jest.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

By following this guide, you can quickly spin up a REST API powered by Knex and Express. Feel free to extend, customize, and contribute to the project!
