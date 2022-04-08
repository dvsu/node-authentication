const Joi = require("joi");
const bcrypt = require("bcrypt");

const schema = Joi.object({
  email: Joi.string()
    .min(3)
    .max(64)
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.base": "'{#key}' must be a string",
      "string.empty": "'{#key}' must not be empty",
      "string.min": "'{#key}' should have a minimum length of {#limit}",
      "string.max": "'{#key}' should have a maximum length of {#limit}",
      "string.email": "'{#key}' format is invalid",
      "any.required": "'{#key}' property is required",
    }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .min(8)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "'{#key}' must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, and 1 special character",
      "string.base": "'{#key}' must be a string",
      "string.empty": "'{#key}' must not be empty",
      "string.min": "'{#key}' should have a minimum length of {#limit}",
      "string.max": "'{#key}' should have a maximum length of {#limit}",
      "any.only": "'{#key}' format is invalid",
      "any.required": "'{#key}' property is required",
    }),
});

module.exports = class SigninUser {
  constructor(body) {
    const result = schema.validate(body);
    if (result.error) {
      throw {
        message: result.error.message,
      };
    }
    this.email = result.value.email;
    this.password = result.value.password;
  }

  async passwordIsValid(hash) {
    try {
      return await bcrypt.compare(this.password, hash);
    } catch (error) {
      throw {
        message: "Failed to compare password",
      };
    }
  }
};
