// src/server/middlewares.ts

import { Request, Response, NextFunction } from "express";
import { KNEXPRESSO_LOGGER } from "../utils/logger.util";
import { sendErrorResponse } from "./responseHelper";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Log the error
  KNEXPRESSO_LOGGER.error(`Error occurred: ${err.message}`);

  // Differentiating error types and sending appropriate error responses
  if (err.name === "ValidationError") {
    sendErrorResponse(res, err.message || "Invalid input provided", 400);
  } else if (err.name === "UnauthorizedError") {
    sendErrorResponse(res, "Unauthorized access", 401);
  } else if (err.name === "NotFoundError") {
    sendErrorResponse(res, err.message || "Resource not found", 404);
  } else if (
    err.code === "ER_NO_SUCH_TABLE" ||
    err.code === "ER_BAD_DB_ERROR"
  ) {
    sendErrorResponse(
      res,
      "Database error occurred: " +
        (err.message || "Invalid table or database configuration"),
      500,
    );
  } else if (err instanceof SyntaxError && "body" in err) {
    sendErrorResponse(res, "Invalid JSON format in request body", 400);
  } else if (err.type === "entity.parse.failed") {
    sendErrorResponse(res, "Invalid JSON payload received", 400);
  } else {
    sendErrorResponse(res, "Internal Server Error", 500);
  }

  KNEXPRESSO_LOGGER.error(err.stack);
}
