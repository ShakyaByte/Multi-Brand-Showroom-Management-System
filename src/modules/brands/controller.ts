import type { Request, Response, NextFunction } from "express";
import { BrandsService } from "./service";

export const controller = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await BrandsService.create(req.body, (req as any).user);
      res.status(201).json({ success: true, message: "Created successfully", data });
    } catch (error) {
      next(error);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await BrandsService.list(req.query as any, (req as any).user);
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
      const data = await BrandsService.find(id as string, (req as any).user);
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
      const data = await BrandsService.update(id as string, req.body, (req as any).user);
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
      const data = await BrandsService.delete(id as string, (req as any).user);
      res.json({ success: true, message: "Deleted successfully", data });
    } catch (error) {
      next(error);
    }
  },
};
