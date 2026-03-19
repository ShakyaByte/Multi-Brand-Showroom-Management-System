import Model from "./model";
import Resource from "./resource";
import { AppError } from "../../utils/appError";
import { createSchema, updateSchema } from "./validator";
import type { ICreateShowroom, IShowroomQueryParams } from "./interface";

export const ShowroomsService = {
  create: async (input: ICreateShowroom) => {
    const { value, error } = createSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const data = await Model.create(value);
    return Resource.toJson(data as any);
  },

  list: async (query: IShowroomQueryParams) => {
    const data = await Model.findAllAndCount(query);
    const formattedItems = Resource.collection(data.items as any[]);
    return { ...data, items: formattedItems };
  },

  find: async (id: string) => {
    const data = await Model.findById(Number(id));
    if (!data) throw new AppError("Showroom not found", 404);
    return Resource.toJson(data as any);
  },

  update: async (id: string, input: any) => {
    const { value, error } = updateSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    const existing = await Model.findById(Number(id));
    if (!existing) throw new AppError("Showroom not found", 404);

    const data = await Model.update(Number(id), value);
    return Resource.toJson(data as any);
  },

  delete: async (id: string) => {
    const existing = await Model.findById(Number(id));
    if (!existing) throw new AppError("Showroom not found", 404);

    const data = await Model.delete(Number(id));
    return Resource.toJson(data as any);
  },
};
