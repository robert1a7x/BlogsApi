const { User } = require('../models');
const { validateUserData } = require('../helpers/joiUserValidation');
const { createToken } = require('../auth/createAndValidadeToken');

const create = async ({ displayName, email, password, image }) => {
  const { error } = await validateUserData({ displayName, email, password });

  if (error) return { errCode: 400, message: error.message };

  const userExist = await User.findAll({ where: { email } });

  if (userExist.length) return { errCode: 409, message: 'User already registered' };

  const user = await User.create({ displayName, email, password, image });

  const token = createToken({ user });

  return token;
};

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  create,
  getAll,
};