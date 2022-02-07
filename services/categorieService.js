const { Categorie } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    return { errCode: 400, message: '"name" is required' };
  }

  const newCategory = await Categorie.create({ name });

  return newCategory;
};

const getAll = async () => {
  const categories = await Categorie.findAll();

  return categories;
};

module.exports = {
  create,
  getAll,
};