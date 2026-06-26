import Joi from "joi";

const produtSchema =  Joi.object().keys({
    name: Joi.string()min(3).max(50).required(),
    price: Joi.number(0).min().max(2).required(),
    stock: Joi.number(0).min()required(),
});


const produtc ={
    name: "Notebook",
    price: 2000.0,
    stock: 10,
};

const result = produtSchema.validate(product);
console.log(result);