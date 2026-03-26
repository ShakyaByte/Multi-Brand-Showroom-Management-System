import type { Request, Response, NextFunction } from "express";
import { AppError, jwtVerify } from "../utils";
import { db } from "../db";
import usersSchema from "../modules/users/schema";
import rolesSchema from "../modules/roles/schema";
import { eq } from "drizzle-orm";

const checkAuthentication =
  (allowedRoles: string[] = [], allowedPermissions: string[] = []) =>
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

      // Fetch full user with role from DB
      const [user] = await db
        .select({
          id: usersSchema.id,
          name: usersSchema.name,
          email: usersSchema.email,
          roleId: usersSchema.roleId,
          brandId: usersSchema.brandId,
          showroomId: usersSchema.showroomId,
          isActive: usersSchema.isActive,
          roleName: rolesSchema.name,
          rolePermissions: rolesSchema.permissions,
        })
        .from(usersSchema)
        .innerJoin(rolesSchema, eq(usersSchema.roleId, rolesSchema.id))
        .where(eq(usersSchema.id, decoded.id));

      if (!user) {
        throw new AppError("Unauthorized: User not found", 401);
      }

      if (!user.isActive) {
        throw new AppError("Unauthorized: Account is deactivated", 401);
      }

      // Attach user info to request
      (req as any).user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roleName,
        roleId: user.roleId,
        brandId: user.brandId,
        showroomId: user.showroomId,
        permissions: user.rolePermissions as string[],
      };

      const userRole = user.roleName;
      const userPermissions = (user.rolePermissions as string[]) || [];

      // Role-based access check
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        throw new AppError("Forbidden: Insufficient role permissions", 403);
      }

      // Granular permission check
      if (allowedPermissions.length > 0) {
        const hasPermission = allowedPermissions.some((permission) =>
          userPermissions.includes(permission)
        );
        if (!hasPermission) {
          throw new AppError("Forbidden: Insufficient permissions", 403);
        }
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };

export default checkAuthentication;
