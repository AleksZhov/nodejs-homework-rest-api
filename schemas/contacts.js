const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .required(),
  phone: Joi.string().min(3).required(),
  favorite: Joi.boolean().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .required(),
  phone: Joi.string().min(3).required(),
  favorite: Joi.boolean().required(),
});
const favoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

module.exports = { addSchema, updateSchema, favoriteSchema };
