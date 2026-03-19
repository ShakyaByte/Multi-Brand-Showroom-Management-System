import type { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";
import { logger } from "../config/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Handle AppError
  if (err instanceof AppError) {
    logger.warn({ message: err.message, status: err.statusCode }, "AppError");
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Joi validation errors
  if (err && err.isJoi) {
    const errorDetails = err.details.map((detail: any) => ({
      field: detail.context?.key,
      message: detail.message,
    }));
    logger.warn({ message: "Validation error", errors: errorDetails }, "JoiValidationError");
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errorDetails,
    });
  }

  // JWT / Auth errors
  if (err instanceof Error) {
    if (
      ["jwt expired", "jwt malformed", "Unauthorized", "UNAUTHORIZED"].includes(
        err.message
      )
    ) {
      logger.warn({ message: err.message }, "AuthError");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (["Invalid API Key"].includes(err.message)) {
      logger.warn({ message: err.message }, "APIKeyError");
      return res.status(401).json({ success: false, message: "Invalid API Key" });
    }

    if (["NOT_FOUND", "User not found"].includes(err.message)) {
      logger.warn({ message: err.message }, "NotFound");
      return res.status(404).json({ success: false, message: "Not Found" });
    }
  }

  // Default internal server error
  logger.error({ err }, "UnhandledError");
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
