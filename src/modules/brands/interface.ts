import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import brandsSchema from "./schema";

export type IBrand = InferSelectModel<typeof brandsSchema>;
export type ICreateBrand = InferInsertModel<typeof brandsSchema>;

export interface IBrandQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}
