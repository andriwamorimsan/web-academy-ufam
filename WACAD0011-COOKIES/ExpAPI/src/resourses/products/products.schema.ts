import Joi from "joi";

const produtSchema =  Joi.object().keys({
    name: Joi.string()min(3).max(50).required(),
    price: Joi.number().min().max(2).required(),
    stock: Joi.number().min()required(),
});


const product ={
    name: "Notebook",
    price: 2000.0,
    stock: 10,
};

const result = produtSchema.validate(product);
console.log(result);