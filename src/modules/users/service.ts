import Model from "./model";
import Resource from "./resource";
import { AppError } from "../../utils/appError";
import { hashPassword } from "../../utils/helper";
import { createSchema, updateSchema } from "./validator";
import type { ICreateUser, IUserQueryParams } from "./interface";
import RolesModel from "../roles/model";

export const UsersService = {
  create: async (input: ICreateUser, user: any) => {
    const { value, error } = createSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    // ABAC: Enforce brandId if user is BRAND_MANAGER or SHOWROOM_MANAGER
    if (user.role !== "SUPER_ADMIN") {
      value.brandId = user.brandId;
    }

    const role = await RolesModel.findById(value.roleId);
    if (!role) {
      throw new AppError("Invalid roleId: Role does not exist", 400);
    }

    const existing = await Model.findByEmail(value.email);
    if (existing) {
      throw new AppError("Email already exists", 400);
    }

    // Hash password before storing
    value.password = await hashPassword(value.password);

    const data = await Model.create(value);
    return Resource.toJson(data as any);
  },

  list: async (query: IUserQueryParams, user: any) => {
    const data = await Model.findAllAndCount(query, user);
    const formattedItems = Resource.collection(data.items as any[]);
    return { ...data, items: formattedItems };
  },

  find: async (id: string, user: any) => {
    const data = await Model.findById(Number(id), user);
    if (!data) throw new AppError("User not found or unauthorized", 404);
    return Resource.toJson(data as any);
  },

  update: async (id: string, input: any, user: any) => {
    const { value, error } = updateSchema.validate(input, { abortEarly: false });
    if (error) throw error;

    // Check authorization before update
    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("User not found or unauthorized", 404);

    // ABAC: Prevent non-SUPER_ADMIN from changing brandId or role
    if (user.role !== "SUPER_ADMIN") {
      delete value.brandId;
      delete value.roleId;
    }

    // Hash password if being updated
    if (value.password) {
      value.password = await hashPassword(value.password);
    }

    const data = await Model.update(Number(id), value);
    return Resource.toJson(data as any);
  },

  delete: async (id: string, user: any) => {
    // Check authorization before delete
    const existing = await Model.findById(Number(id), user);
    if (!existing) throw new AppError("User not found or unauthorized", 404);

    const data = await Model.delete(Number(id));
    return Resource.toJson(data as any);
  },
};
