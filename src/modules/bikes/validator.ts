import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  specs: Joi.object().optional().allow(null),
  brandId: Joi.number().integer().required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  specs: Joi.object().optional().allow(null),
  brandId: Joi.number().integer().optional(),
});
