import Joi from "joi";
import { UserTypes } from "../../types.js";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).max(150).required(),
  password: Joi.string().min(6).max(72).required(),
  userTypeId: Joi.string().valid(UserTypes.ADMIN, UserTypes.CLIENT).required(),
});

export const updateUserSchema = userSchema.fork(["name", "email", "password", "userTypeId"], (field) =>
  field.optional(),
);
