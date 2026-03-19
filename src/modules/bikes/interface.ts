import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import bikesSchema from "./schema";

export type IBike = InferSelectModel<typeof bikesSchema>;
export type ICreateBike = InferInsertModel<typeof bikesSchema>;

export interface IBikeQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
}
