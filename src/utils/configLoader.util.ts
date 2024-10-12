// Function to load configuration from the file
import * as fs from "node:fs";
import { KNEXPRESSO_LOGGER } from "./logger.util";

export function loadConfig(configFilePath: string): any {
  if (!fs.existsSync(configFilePath)) {
    KNEXPRESSO_LOGGER.error(
      `Error: Config file not found at path: ${configFilePath}`,
    );
    process.exit(1);
  }

  try {
    const configFileContents = fs.readFileSync(configFilePath, "utf8");
    return JSON.parse(configFileContents);
  } catch (error) {
    KNEXPRESSO_LOGGER.error(
      "Error: Unable to read or parse the configuration file.",
    );
    if (error instanceof Error) {
      KNEXPRESSO_LOGGER.error(error.message);
    }
    process.exit(1);
  }
}
