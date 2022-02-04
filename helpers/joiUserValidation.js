const Joi = require('joi');

const validateUserData = ({ displayName, email, password }) => (
  Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
}).validate({ displayName, email, password })
);

const loginValidation = ({ email, password }) => (
  Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
}).validate({ email, password })
);

module.exports = {
  validateUserData,
  loginValidation,
};