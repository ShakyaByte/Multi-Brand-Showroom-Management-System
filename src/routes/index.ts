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

  // Register all module routes
  routes.forEach((route) => {
    const { method, path, controller, authorization, authCheckType, permissions, rateLimit } = route;

    const middlewares: any[] = [];

    // Add per-route rate limiter if specified
    if (rateLimit) {
      middlewares.push(rateLimit);
    }

    // Add authentication middleware if route requires authorization
    if (authorization) {
      middlewares.push(checkAuthentication(authCheckType, permissions));
    }

    app[method](`/api/${path}`, ...middlewares, controller);
  });

  // Global error handler (must be registered AFTER all routes)
  app.use(errorHandler);
};

export default routesInit;

