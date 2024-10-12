import { KNEXPRESSO_LOGGER } from "../utils/logger.util";
import { sendErrorResponse } from "../server/responseHelper";
import { Request, Response } from "express";

export const errorAction = (
  err: { message: any },
  req: Request,
  res: Response,
  next: any,
) => {
  KNEXPRESSO_LOGGER.error(`Error occurred: ${err.message}`);
  sendErrorResponse(res, err.message || "Internal Server Error", 500);
};
