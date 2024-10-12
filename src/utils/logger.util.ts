import { Logger } from "../types/logger.type";

function log(message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} [Knexpresso] ${message}`);
}

export const defaultLogger: Logger = {
  debug: function (message: string): void {
    log(message);
  },
  info: function (message: string): void {
    log(message);
  },
  error: function (message: string): void {
    log(message);
  },
  warn: function (message: string): void {
    log(message);
  },
};

export let KNEXPRESSO_LOGGER = defaultLogger;

export function setKnexpressoLogger(logger: Logger) {
  KNEXPRESSO_LOGGER = logger;
}
