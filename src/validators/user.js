const Joi = require('joi');

const registerSchema = Joi.object({
  nom: Joi.string().min(3).max(30).required(),
  prenom: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(100).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};

