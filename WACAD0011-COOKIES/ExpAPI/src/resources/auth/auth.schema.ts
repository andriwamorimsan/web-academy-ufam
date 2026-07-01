import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).max(150).required(),
  password: Joi.string().min(6).max(72).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});
