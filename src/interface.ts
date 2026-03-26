import type { Request, Response, NextFunction } from "express";

export interface IRoute {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>;
  authorization?: boolean;
  authCheckType?: string[];
  permissions?: string[];
}

export interface IParams {
  limit?: number;
  page?: number;
  offset?: number;
  search?: string;
}

export interface IPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize?: number;
}

export interface IError {
  field?: string;
  message: string;
}

export interface IResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: IError[];
  pagination?: IPagination;
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
}
