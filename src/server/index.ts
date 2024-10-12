import { KnexpressoDependencies } from "../types/knexConfig.type";
import errorHandler from "./middlewares";
import { KNEXPRESSO_LOGGER } from "../utils/logger.util";
import express from "express";

const KnexpressoServer = {
  async start(dependencies: KnexpressoDependencies): Promise<any> {
    const app = express();
    const { db, router, serverConfig } = dependencies; // Extract dependencies (Knex, Router, and serverConfig)
    const PORT = serverConfig.port || process.env.PORT || 3000;

    // Middleware to parse JSON
    app.use(express.json());

    // Use the passed router object for routes
    app.use("/api", router);

    // Custom error handler middleware (Generic Error Handler)
    app.use(errorHandler);

    // Start the server and return a promise that resolves when the server starts listening
    return new Promise((resolve, reject) => {
      const server = app.listen(PORT, () => {
        KNEXPRESSO_LOGGER.info(`Knexpresso server started on port ${PORT}`);
        resolve(server); // Resolve the promise with the server instance
      });

      server.on("error", (err) => {
        KNEXPRESSO_LOGGER.error(`Failed to start server: ${err.message}`);
        reject(err); // Reject the promise if there is an error
      });
    });
  },

  async stop(serverInstance: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (serverInstance) {
        serverInstance.close((err: { message: any }) => {
          if (err) {
            KNEXPRESSO_LOGGER.error(`Failed to stop server: ${err.message}`);
            reject(err); // Reject the promise if there's an error during shutdown
          } else {
            KNEXPRESSO_LOGGER.info(`Knexpresso server stopped`);
            resolve(); // Resolve the promise once the server has stopped
          }
        });
      } else {
        resolve();
      }
    });
  },
};

export default KnexpressoServer;
