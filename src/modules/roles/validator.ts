import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string()
    .valid("SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER", "SUPER_VISOR")
    .required(),
  permissions: Joi.array().items(Joi.string()).optional().default([]),
});

export const updateSchema = Joi.object({
  name: Joi.string()
    .valid("SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER", "SUPER_VISOR")
    .optional(),
  permissions: Joi.array().items(Joi.string()).optional(),
});
