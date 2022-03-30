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

const postValidation = ({ title, content, categoryIds }) => (
  Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
}).validate({ title, content, categoryIds })
);

const updateValidation = ({ title, content }) => (
  Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).validate({ title, content })
);

module.exports = {
  validateUserData,
  loginValidation,
  postValidation,
  updateValidation,
};