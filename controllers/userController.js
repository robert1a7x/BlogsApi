const userService = require('../services/userService');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const createdUserToken = await userService.create({ displayName, email, password, image });

  if (createdUserToken.errCode) return next(createdUserToken);

  return res.status(201).json({ token: createdUserToken });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (user.errCode) return next(user);

  return res.status(200).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};