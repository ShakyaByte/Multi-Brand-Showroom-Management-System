import type { Request, Response, NextFunction } from "express";
import { ShowroomsService } from "./service";

export const controller = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await ShowroomsService.create(req.body);
      res.status(201).json({ success: true, message: "Created successfully", data });
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await ShowroomsService.list(req.query as any);
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
      const data = await ShowroomsService.find(id as string);
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
      const data = await ShowroomsService.update(id as string, req.body);
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
      const data = await ShowroomsService.delete(id as string);
      res.json({ success: true, message: "Deleted successfully", data });
    } catch (error) {
      next(error);
    }
  },
};