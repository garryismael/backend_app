const Joi = require("joi");

const userBaseObject = {
	nom: Joi.string().min(3).max(30).required(),
	prenom: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
};

const registerSchema = Joi.object({
	...userBaseObject,
	password: Joi.string().min(5).max(100).required(),
});

const userBaseSchema = Joi.object({
	...userBaseObject
});;

const loginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

module.exports = {
	registerSchema,
	loginSchema,
	userBaseSchema,
};

