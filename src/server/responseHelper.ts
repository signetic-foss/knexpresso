// src/server/responseHelper.ts

import { Response } from "express";

/**
 * Helper to send success response with 200 status code
 */
export function sendSuccessResponse(
  res: Response,
  data: any,
  message: string = "Success",
): void {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
}

/**
 * Helper to send error response with specified status code (defaults to 500)
 */
export function sendErrorResponse(
  res: Response,
  error: string,
  statusCode: number = 500,
): void {
  res.status(statusCode).json({
    status: "error",
    message: error,
  });
}
