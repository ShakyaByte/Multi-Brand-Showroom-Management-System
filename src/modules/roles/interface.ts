import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import rolesSchema from "./schema";

export type IRole = InferSelectModel<typeof rolesSchema>;
export type ICreateRole = InferInsertModel<typeof rolesSchema>;

export interface IRoleQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}
