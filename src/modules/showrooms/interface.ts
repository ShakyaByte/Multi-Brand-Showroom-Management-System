import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import showroomsSchema from "./schema";

export type IShowroom = InferSelectModel<typeof showroomsSchema>;
export type ICreateShowroom = InferInsertModel<typeof showroomsSchema>;

export interface IShowroomQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  brandId?: number;
}
