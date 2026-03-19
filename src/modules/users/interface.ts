import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import usersSchema from "./schema";

export type IUser = InferSelectModel<typeof usersSchema>;
export type ICreateUser = InferInsertModel<typeof usersSchema>;

export interface IUserQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  brandId?: number;
}
