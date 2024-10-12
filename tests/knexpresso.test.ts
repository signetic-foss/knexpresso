import request from "supertest";
import knexpressoConfig from "../knexpresso.config.test-config";
import { Server } from "http";
import { setupDatabase } from "../scripts/testSetup";
import { cleanupDatabase } from "../scripts/testCleanup";
import KnexpressoServer from "../src/server";
import { getKnexConnection } from "../src/utils/connection.util";
import { startKnexpresso } from "../src";

let server: Server;
const db = getKnexConnection(knexpressoConfig);

beforeAll(async () => {
  await setupDatabase(db); // Setup the test database
  server = (await startKnexpresso(knexpressoConfig)) as Server;
});

afterAll(async () => {
  await cleanupDatabase(db); // Cleanup the test database
  await KnexpressoServer.stop(server); // Stop the server after tests
});

describe("Knexpresso REST API GET Tests", () => {
  // Test to fetch all users
  it("should fetch all users", async () => {
    const response = await request(server).get("/api/users");
    console.log(response.body); // Add this line to log the response body for debugging
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  // Test to fetch a single user by ID
  it("should fetch a single user by ID", async () => {
    const response = await request(server).get("/api/users?id=1");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.length).toBe(1); // Only one user should be returned
    expect(response.body.data[0].id).toBe(1); // The user ID should match
  });

  // Test to fetch users with a limit
  it("should fetch a limited number of users", async () => {
    const response = await request(server).get("/api/users?limit=1");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1); // The limit should be enforced
  });

  // Test to fetch users based on query filters
  it("should fetch users based on query filters", async () => {
    const response = await request(server).get("/api/users?name=Alice");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1); // Only Alice should be returned
    expect(response.body.data[0].name).toBe("Alice"); // Verify the user's name
  });

  // Test for fetching all orders
  it("should fetch all orders", async () => {
    const response = await request(server).get("/api/orders");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });

  // Test to fetch orders for a specific user
  it("should fetch orders for a specific user", async () => {
    const response = await request(server).get("/api/orders?user_id=1");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0); // Should return orders for user ID 1
    expect(response.body.data[0].user_id).toBe(1); // Verify the user_id field in orders
  });

  // Test for handling non-existent user ID
  it("should return an empty result for a non-existent user ID", async () => {
    const response = await request(server).get("/api/users?id=999");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.length).toBe(0); // No users should be returned
  });

  // Test for 404 error on a non-existent route
  it("should return a 404 error for a non-existent route", async () => {
    const response = await request(server).get("/api/nonexistent");
    expect(response.status).toBe(404);
  });

  // Test to fetch all addresses
  it("should fetch all addresses", async () => {
    const response = await request(server).get("/api/addresses");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0); // Should return all addresses
  });

  // Test to fetch addresses for a specific user
  it("should fetch addresses for a specific user", async () => {
    const response = await request(server).get("/api/addresses?user_id=1");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0); // Should return addresses for user ID 1
    expect(response.body.data[0].user_id).toBe(1); // Verify the user_id field in addresses
  });

  // Test for handling non-existent user address
  it("should return an empty result for a non-existent user address", async () => {
    const response = await request(server).get("/api/addresses?user_id=999");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.length).toBe(0); // No addresses should be returned
  });
});

describe("Exists Feature Tests", () => {
  it("should check if a user exists with specific email", async () => {
    const response = await request(server).get(
      "/api/users?exists=true&email=alice@example.com",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.exists).toBe(true);
  });

  it("should return false if a user does not exist with specific email", async () => {
    const response = await request(server).get(
      "/api/users?exists=true&email=nonexistent@example.com",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.exists).toBe(false);
  });

  it("should check if any order exists for a specific user", async () => {
    const response = await request(server).get(
      "/api/orders?exists=true&user_id=1",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.exists).toBe(true);
  });

  it("should return false if no order exists for a non-existent user", async () => {
    const response = await request(server).get(
      "/api/orders?exists=true&user_id=999",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.exists).toBe(false);
  });
});

describe("Count Feature Tests", () => {
  it("should count the number of users", async () => {
    const response = await request(server).get("/api/users?count=true");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.count).toBe(2); // Assuming there are 2 users in the test DB
  });

  it("should count the number of orders for a specific user", async () => {
    const response = await request(server).get(
      "/api/orders?count=true&user_id=1",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.count).toBe(1); // Assuming user ID 1 has 1 order
  });

  it("should return a count of 0 if no orders exist for a specific user", async () => {
    const response = await request(server).get(
      "/api/orders?count=true&user_id=999",
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.count).toBe(0); // No orders for user ID 999
  });
});
