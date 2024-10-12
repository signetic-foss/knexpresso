// index.ts

import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { startKnexpresso } from "./src";
import { KNEXPRESSO_LOGGER } from "./src/utils/logger.util";
import { KnexpressoConfig } from "./src/types/knexConfig.type";
import { loadConfig } from "./src/utils/configLoader.util";

const program = new Command();

// Define the default configuration file path
const DEFAULT_CONFIG_PATH = path.resolve(__dirname, "knexpresso.json");

program
  .version("1.0.0")
  .description("A script that processes a configuration file")
  .option("-c, --config <path>", "specify a config file") // Optional config file, falls back to default
  .option("-p, --port <port>", "specify the server port");

program.parse(process.argv);

// Extract options
const options = program.opts();

// Determine the config file path (use provided config path or fallback to DEFAULT_CONFIG_PATH)
const configPath = options.config
  ? path.resolve(options.config)
  : DEFAULT_CONFIG_PATH;

// Log which config file is being used
KNEXPRESSO_LOGGER.info(`Using configuration from: ${configPath}`);

// Load the config file (either from specified path or default)
const config: KnexpressoConfig = loadConfig(configPath);

// Log the loaded configuration details
KNEXPRESSO_LOGGER.debug("Configuration details:");
KNEXPRESSO_LOGGER.debug(JSON.stringify(config, null, 2));

// Start the Knexpresso server with the loaded config and server config
startKnexpresso(config, options.port)
  .then(() => {
    KNEXPRESSO_LOGGER.debug("Knexpresso server started successfully.");
  })
  .catch((err: any) => {
    KNEXPRESSO_LOGGER.error(
      `Failed to start Knexpresso server:, ${err.message}`,
    );
    process.exit(1);
  });
