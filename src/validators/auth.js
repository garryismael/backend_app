const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().required().email(),
});

const newPasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')),
});

module.exports = {
  newPasswordSchema,
  emailSchema
};

