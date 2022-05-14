const Joi = require("joi");

const donneeSchema = Joi.object({
    type: Joi.required()
});

module.exports = {
    donneeSchema
};