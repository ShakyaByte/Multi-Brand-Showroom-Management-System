import type { Request, Response, NextFunction } from "express";
import env from "../config/env";

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api-key"] as string;

  // Skip API key check for health endpoint
  if (req.path === "/api/health" || req.path === "/") {
    return next();
  }

  if (!apiKey) {
    return next(); // Allow if no Api-Key header present (handled by auth instead)
  }

  if (apiKey !== env.API_KEY) {
    return res.status(401).json({ success: false, message: "Invalid API Key" });
  }

  next();
};

export default checkApiKey;
