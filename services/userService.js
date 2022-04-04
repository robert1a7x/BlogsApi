const { User } = require('../models');
const { validateUserData } = require('../helpers/joiValidations');
const { createToken, validateToken } = require('../auth/createAndValidadeToken');

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

const getById = async (id) => {
  const [user] = await User.findAll({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) return { errCode: 404, message: 'User does not exist' };

  return user;
};

const remove = async (token) => {
  const { email } = validateToken(token);

  const removedUser = await User.destroy({ where: { email } });

  if (removedUser === 0) return { errCode: 404, message: 'User Already removed' };
  
  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};