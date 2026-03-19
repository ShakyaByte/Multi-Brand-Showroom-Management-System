import Model from "./model";
import Resource from "./resource";
import { AppError } from "../../utils/appError";
import { hashPassword } from "../../utils/helper";
import { createSchema, updateSchema } from "./validator";
import type { ICreateUser, IUserQueryParams } from "./interface";

export const UsersService = {
  create: async (input: ICreateUser) => {
    const { value, error } = createSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await Model.findByEmail(value.email);
    if (existing) {
      throw new AppError("Email already exists", 400);
    }

    // Hash password before storing
    value.password = await hashPassword(value.password);

    const data = await Model.create(value);
    return Resource.toJson(data as any);
  },

  list: async (query: IUserQueryParams) => {
    const data = await Model.findAllAndCount(query);
    const formattedItems = Resource.collection(data.items as any[]);
    return { ...data, items: formattedItems };
  },

  find: async (id: string) => {
    const data = await Model.findById(Number(id));
    if (!data) throw new AppError("User not found", 404);
    return Resource.toJson(data as any);
  },

  update: async (id: string, input: any) => {
    const { value, error } = updateSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await Model.findById(Number(id));
    if (!existing) throw new AppError("User not found", 404);

    // Hash password if being updated
    if (value.password) {
      value.password = await hashPassword(value.password);
    }

    const data = await Model.update(Number(id), value);
    return Resource.toJson(data as any);
  },

  delete: async (id: string) => {
    const existing = await Model.findById(Number(id));
    if (!existing) throw new AppError("User not found", 404);

    const data = await Model.delete(Number(id));
    return Resource.toJson(data as any);
  },
};
