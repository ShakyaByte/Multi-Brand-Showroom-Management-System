import type { Express, Request, Response, NextFunction } from "express";
import type { IRoute } from "../interface";
import checkAuthentication from "../middlewares/checkAuthentication";
import { errorHandler } from "../utils/errorHandler";

// Import all module routes
import authRoutes from "../modules/auth/route";
import rolesRoutes from "../modules/roles/route";
import usersRoutes from "../modules/users/route";
import brandsRoutes from "../modules/brands/route";
import showroomsRoutes from "../modules/showrooms/route";
import bikesRoutes from "../modules/bikes/route";

const routes: IRoute[] = [
  ...authRoutes,
  ...rolesRoutes,
  ...usersRoutes,
  ...brandsRoutes,
  ...showroomsRoutes,
  ...bikesRoutes,
];

const routesInit = (app: Express) => {
  // Health check endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  routes.forEach((route) => {
    const {
      method,
      path,
      controller,
      authorization,
      authCheckType,
      permissions,
      rateLimit,
      middlewares: routeMiddlewares,
    } = route;

    const middlewares: any[] = [];

    // 1. Rate limiter first (protects even unauthenticated endpoints)
    if (rateLimit) {
      middlewares.push(rateLimit);
    }

    // 2. Authentication BEFORE file uploads (don't accept files from strangers)
    if (authorization) {
      middlewares.push(checkAuthentication(authCheckType, permissions));
    }

    // 3. Route-specific middlewares like multer AFTER auth
    if (routeMiddlewares && routeMiddlewares.length > 0) {
      middlewares.push(...routeMiddlewares);
    }

    app[method](`/api/${path}`, ...middlewares, controller);
  });

  // Global error handler (must be last)
  app.use(errorHandler);
};

export default routesInit;