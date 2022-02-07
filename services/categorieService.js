const { Categorie } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    return { errCode: 400, message: '"name" is required' };
  }

  const newCategory = await Categorie.create({ name });

  return newCategory;
};

module.exports = {
  create,
};