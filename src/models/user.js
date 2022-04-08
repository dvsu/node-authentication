const Joi = require("joi");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const schema = Joi.object({
  firstName: Joi.string()
    .max(256)
    .pattern(new RegExp(/^[a-z ,.'-]+$/i))
    .required()
    .messages({
      "string.base": "'{#key}' must be a string",
      "string.empty": "'{#key}' must not be empty",
      "string.max": "'{#key}' should have a maximum length of {#limit}",
      "string.pattern.base": "'{#key}' format is invalid",
      "any.required": "'{#key}' property is required",
    }),
  lastName: Joi.string()
    .max(256)
    .pattern(new RegExp(/^[a-z ,.'-]+$/i))
    .required()
    .messages({
      "string.base": "'{#key}' must be a string",
      "string.empty": "'{#key}' must not be empty",
      "string.max": "'{#key}' should have a maximum length of {#limit}",
      "string.pattern.base": "'{#key}' format is invalid",
      "any.required": "'{#key}' property is required",
    }),
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
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "'{#key}' does not match with 'password'",
  }),
});

module.exports = class User {
  #saltRounds = 10;

  constructor(body) {
    const result = schema.validate(body);
    if (result.error) {
      throw {
        message: result.error.message,
      };
    }
    this.id = uuidv4();
    this.firstName = result.value.firstName;
    this.lastName = result.value.lastName;
    this.email = result.value.email;
    this.password = result.value.password;
  }

  async hashPassword() {
    try {
      const salt = await bcrypt.genSalt(this.#saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw {
        message: "Failed to hash password",
      };
    }
  }
};
