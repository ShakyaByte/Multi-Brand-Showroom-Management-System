import Model from "./model";
import Resource from "./resource";
import { AppError } from "../../utils/appError";
import { createSchema, updateSchema } from "./validator";
import type { ICreateBike, IBikeQueryParams } from "./interface";

export const BikesService = {
  create: async (input: ICreateBike, user: any) => {
    const { value, error } = createSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    // ABAC: Enforce brandId if user is not SUPER_ADMIN
    if (user.role !== "SUPER_ADMIN") {
      value.brandId = user.brandId;
    }

    const data = await Model.create(value);
    return Resource.toJson(data as any);
  },

  list: async (query: IBikeQueryParams, user: any) => {
    const data = await Model.findAllAndCount(query, user);
    const formattedItems = Resource.collection(data.items as any[]);
    return { ...data, items: formattedItems };
  },

  find: async (id: string, user: any) => {
    const data = await Model.findById(Number(id), user);
    if (!data) throw new AppError("Bike not found", 404);
    return Resource.toJson(data as any);
  },

  update: async (id: string, input: any, user: any) => {
    const { value, error } = updateSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    // Check if user has access to this resource before updating
    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("Bike not found or unauthorized", 404);

    // ABAC: Prevent non-SUPER_ADMIN from changing brandId
    if (user.role !== "SUPER_ADMIN") {
      delete value.brandId; 
    }

    const data = await Model.update(Number(id), value);
    return Resource.toJson(data as any);
  },

  delete: async (id: string, user: any) => {
    // Check if user has access to this resource before deleting
    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("Bike not found or unauthorized", 404);

    const data = await Model.delete(Number(id));
    return Resource.toJson(data as any);
  },
};
