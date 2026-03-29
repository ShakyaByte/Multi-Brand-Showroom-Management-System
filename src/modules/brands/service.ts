import Model from "./model";
import Resource from "./resource";
import { AppError } from "../../utils/appError";
import { createSchema, updateSchema } from "./validator";
import type { ICreateBrand, IBrandQueryParams } from "./interface";

export const BrandsService = {
  create: async (input: ICreateBrand, _user: any) => {
    const { value, error } = createSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await Model.findByName(value.name);
    if (existing) {
      throw new AppError("Brand already exists", 400);
    }

    const data = await Model.create(value);
    return Resource.toJson(data as any);
  },

  list: async (query: IBrandQueryParams, user: any) => {
    const data = await Model.findAllAndCount(query, user);
    const formattedItems = Resource.collection(data.items as any[]);
    return { ...data, items: formattedItems };
  },

  find: async (id: string, user: any) => {
    const data = await Model.findById(Number(id), user);
    if (!data) throw new AppError("Brand not found or unauthorized", 404);
    return Resource.toJson(data as any);
  },

  update: async (id: string, input: any, user: any) => {
    const { value, error } = updateSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("Brand not found or unauthorized", 404);

    const data = await Model.update(Number(id), value);
    return Resource.toJson(data as any);
  },

  delete: async (id: string, user: any) => {
    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("Brand not found or unauthorized", 404);

    const data = await Model.delete(Number(id));
    return Resource.toJson(data as any);
  },
};
