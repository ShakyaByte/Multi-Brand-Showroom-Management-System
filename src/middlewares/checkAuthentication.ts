import type { Request, Response, NextFunction } from "express";
import { AppError, jwtVerify } from "../utils";

const checkAuthentication =
  (allowedRoles: string[] = []) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      let token = authHeader?.split(" ")[1];

      if (!token && allowedRoles.includes("public")) {
        return next(); // Allow public access
      }

      if (!token) {
        throw new AppError("Unauthorized: No token provided", 401);
      }

      let decoded: any;
      try {
        decoded = jwtVerify(token);
      } catch (error: any) {
        throw new AppError("Unauthorized: Invalid or expired token", 401);
      }

      if (!decoded || typeof decoded === "string") {
        throw new AppError("Unauthorized: Invalid token payload", 401);
      }

      // Attach decoded user info to request
      (req as any).user = decoded;

      // Role-based access check
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        throw new AppError("Forbidden: Insufficient permissions", 403);
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };

export default checkAuthentication;
