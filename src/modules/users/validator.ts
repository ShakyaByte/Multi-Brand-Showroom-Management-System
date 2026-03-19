import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roleId: Joi.number().integer().required(),
  brandId: Joi.number().integer().optional().allow(null),
});

export const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  roleId: Joi.number().integer().optional(),
  brandId: Joi.number().integer().optional().allow(null),
  isActive: Joi.boolean().optional(),
});
