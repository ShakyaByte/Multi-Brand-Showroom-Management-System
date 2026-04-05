import type { Request, Response, NextFunction } from "express";
import { UsersService } from "./service";
import fs from "fs";
import path from "path";

// Helper to build URL from multer file
const getFileUrl = (file: Express.Multer.File) =>
  `/uploads/documents/${file.filename}`;

// Helper to delete old file from disk
const deleteOldFile = (filePath?: string | null) => {
  if (!filePath) return;
  // Convert URL path to actual disk path
  const diskPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(diskPath)) {
    fs.unlinkSync(diskPath);
  }
};

export const controller = {
  create: async (req: Request, res: Response, next: NextFunction) => {
   try {
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      const docFront = files?.documentFront?.[0];
      const docBack = files?.documentBack?.[0];

      // Validate required files
      if (!docFront || !docBack) {
        res.status(400).json({
          success: false,
          message: "Both documentFront and documentBack are required",
        });
        return;
      }

      req.body.documentFront = getFileUrl(docFront);
      req.body.documentBack = getFileUrl(docBack);

      const data = await UsersService.create(req.body, (req as any).user);
      res
        .status(201)
        .json({ success: true, message: "Created successfully", data });
    } catch (error) {
      next(error);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await UsersService.list(req.query as any, (req as any).user);
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
      const data = await UsersService.find(id as string, (req as any).user);
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

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      // Fetch existing user to get old file paths
      const existingUser = await UsersService.find(id as string, (req as any).user);

      const docFront = files?.documentFront?.[0];
      if (docFront) {
        // Delete old file before replacing
        deleteOldFile(existingUser?.documentFront);
        req.body.documentFront = getFileUrl(docFront);
      }

      const docBack = files?.documentBack?.[0];
      if (docBack) {
        // Delete old file before replacing
        deleteOldFile(existingUser?.documentBack);
        req.body.documentBack = getFileUrl(docBack);
      }

      const data = await UsersService.update(
        id as string,
        req.body,
        (req as any).user
      );
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
      const data = await UsersService.delete(id as string, (req as any).user);
      res.json({ success: true, message: "Deleted successfully", data });
    } catch (error) {
      next(error);
    }
  },
};
