const Joi = require("joi");

const addSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .required(),
  password: Joi.string().min(3).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .required(),
  password: Joi.string().min(3).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const changeSubscrSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = { addSchema, loginSchema, changeSubscrSchema };
