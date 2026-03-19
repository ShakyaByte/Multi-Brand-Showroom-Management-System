import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string()
    .valid("SUPER_ADMIN", "BRAND_ADMIN", "MANAGER")
    .required(),
});

export const updateSchema = Joi.object({
  name: Joi.string()
    .valid("SUPER_ADMIN", "BRAND_ADMIN", "MANAGER")
    .optional(),
});
