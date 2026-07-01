import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).precision(2).required(),
  stockQuantity: Joi.number().integer().min(0).required(),
});

export default productSchema;
