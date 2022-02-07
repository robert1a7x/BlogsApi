const categorieService = require('../services/categorieService');

const create = async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await categorieService.create({ name });

  if (newCategory.errCode) return next(newCategory);

  return res.status(201).json(newCategory);
};

const getAll = async (_req, res) => {
  const categories = await categorieService.getAll();

  return res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};