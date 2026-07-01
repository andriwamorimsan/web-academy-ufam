import Joi from "joi";

export default Joi.object({
  lang: Joi.string().valid("pt-BR", "en-US", "es-ES").required(),
});
