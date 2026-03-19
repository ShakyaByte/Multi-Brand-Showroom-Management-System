import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().uri().optional().allow(null, ""),
});

export const updateSchema = Joi.object({
  name: Joi.string().optional(),
  logo: Joi.string().uri().optional().allow(null, ""),
});
