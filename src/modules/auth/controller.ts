import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./service";

export const controller = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.register(req.body);
      res.status(201).json({ success: true, message: "Registered successfully", data });
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.login(req.body);
      res.json({ success: true, message: "Login successful", data });
    } catch (error) {
      next(error);
    }
  },
};
