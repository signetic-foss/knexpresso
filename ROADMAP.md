# Knexpresso Roadmap

This document outlines the planned features and enhancements for Knexpresso. Contributions from the community are highly encouraged!

---

## Upcoming Features

1. **Support for POST, PUT, DELETE, and HEAD Methods**

    - **Description**: Extend the API to fully support all standard HTTP methods necessary for complete CRUD (Create, Read, Update, Delete) operations.
        - **POST**: Implement for creating new records in the database.
        - **PUT**: Enable updating existing records.
        - **DELETE**: Allow deletion of records based on specified criteria.
        - **HEAD**: Provide support for retrieving metadata about resources without the response body.

2. **Integration Tests with Docker and Jest**

    - **Description**: Develop a comprehensive suite of integration tests using Jest and Docker to test Knexpresso against various databases (e.g., PostgreSQL, MySQL, SQLite).
        - Ensure compatibility across different database systems.
        - Automate testing environments using Docker containers.

3. **Authentication and Authorization Support**

    - **Description**: Implement authentication mechanisms to secure API endpoints.
        - Support for JWT (JSON Web Tokens), OAuth2, or other authentication strategies.
        - Implement role-based access control (RBAC) to manage permissions for different user roles.

4. **Automatic OpenAPI/Swagger Documentation Generation**

    - **Description**: Automatically generate OpenAPI (Swagger) documentation based on the database schema and API endpoints.
        - Provide interactive API documentation for developers.
        - Keep documentation up-to-date with code changes.

5. **Relationship Handling and Nested Resources**

    - **Description**: Support defining and exposing relationships between tables.
        - Handle one-to-one, one-to-many, and many-to-many relationships.
        - Enable nested routes and include related data in API responses (e.g., `/api/users/1/orders`).

6. **Advanced Query Capabilities**

    - **Description**: Implement advanced querying features.
        - Filtering: Allow clients to filter results based on field values.
        - Sorting: Enable sorting of results based on specified fields.
        - Pagination: Implement limit and offset mechanisms.
        - Searching: Allow full-text search capabilities.

7. **Batch Operations Support**

    - **Description**: Allow clients to perform batch operations.
        - Bulk Inserts: Insert multiple records in a single request.
        - Bulk Updates: Update multiple records based on criteria.
        - Bulk Deletes: Delete multiple records at once.

8. **Caching Mechanism**

    - **Description**: Introduce caching strategies to improve performance.
        - Implement in-memory caching for frequently accessed data.
        - Integrate with external caching systems like Redis or Memcached.
        - Support cache invalidation strategies.

9. **Intelligent Data Model Generation Without Configuration**

    - **Description**: Develop a feature to automatically generate API endpoints by introspecting the database schema.
        - Reduce or eliminate the need for manual configuration.
        - Dynamically adapt to schema changes.

---

## Contribution Guidelines

We welcome contributions from the community! If you're interested in working on any of these features, please:

- **Check Existing Issues**: See if an issue already exists for the feature you're interested in.
- **Create a New Issue**: If not, feel free to open a new issue to discuss your ideas.
- **Follow the Contributing Guidelines**: Refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to contribute.


