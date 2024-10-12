import { sendErrorResponse } from "../server/responseHelper";
import { Request, Response } from "express";

export const nonExistantAction = (req: Request, res: Response) => {
  sendErrorResponse(res, "Route not found", 404);
};
