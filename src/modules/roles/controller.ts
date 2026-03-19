import type { Request, Response, NextFunction } from "express";
import { RolesService } from "./service";

export const controller = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await RolesService.create(req.body);
      res.status(201).json({ success: true, message: "Created successfully", data });
    } catch (error) {
      next(error);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await RolesService.list(req.query as any);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  find: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "ID is required" });
        return;
      }
      const data = await RolesService.find(id as string);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "ID is required" });
        return;
      }
      const data = await RolesService.update(id as string, req.body);
      res.json({ success: true, message: "Updated successfully", data });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: "ID is required" });
        return;
      }
      const data = await RolesService.delete(id as string);
      res.json({ success: true, message: "Deleted successfully", data });
    } catch (error) {
      next(error);
    }
  },
};
