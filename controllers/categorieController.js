const categorieService = require('../services/categorieService');

const create = async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await categorieService.create({ name });

  if (newCategory.errCode) return next(newCategory);

  return res.status(201).json(newCategory);
};

module.exports = {
  create,
};