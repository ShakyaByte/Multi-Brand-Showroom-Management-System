import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().optional().allow(null, ""),
  latitude: Joi.number().optional().allow(null),
  longitude: Joi.number().optional().allow(null),
  brandId: Joi.number().integer().required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional().allow(null, ""),
  latitude: Joi.number().optional().allow(null),
  longitude: Joi.number().optional().allow(null),
  brandId: Joi.number().integer().optional(),
});
