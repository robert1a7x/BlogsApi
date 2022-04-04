const { Op } = require('sequelize');
const { BlogPost, Categorie, User } = require('../models');
const { postValidation, updateValidation } = require('../helpers/joiValidations');
const { validateToken } = require('../auth/createAndValidadeToken');

const create = async ({ title, content, categoryIds }, token) => {
  const { error } = postValidation({ title, content, categoryIds });

  if (error) return { errCode: 400, message: error.message };

  const [categoryExist] = await Promise.all(categoryIds.map((id) => (
    Categorie.findAll({ where: { id } }))));

  if (categoryExist.length === 0) {
    return { errCode: 400, message: '"categoryIds" not found' };
  }

  const { email } = validateToken(token);

  const [{ id }] = await User.findAll({ where: { email } });

  const newPost = await BlogPost.create({ userId: id, title, content });

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getByQuery = async (q) => {
  // Source: https://stackoverflow.com/questions/31258158/how-to-implement-search-feature-using-sequelizejs
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getByPostId = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { errCode: 404, message: 'Post does not exist' };

  return post;
};

const update = async ({ title, content, categoryIds }, id, token) => {
  const { error } = updateValidation({ title, content });

  if (error) return { errCode: 400, message: error.message };

  if (categoryIds) return { errCode: 400, message: 'Categories cannot be edited' };

  const { userId } = validateToken(token);

  const post = await getByPostId(id);

  if (post.errCode) return { errCode: 404, message: 'Post does not exist' };

  if (userId !== post.id) return { errCode: 401, message: 'Unauthorized user' };

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await BlogPost.findByPk(id, {
    attributes: ['title', 'content', 'userId'],
    include: [
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

const remove = async (id, token) => {
  const { userId } = validateToken(token);

  const post = await getByPostId(id);

  if (post.errCode) return { errCode: 404, message: 'Post does not exist' };

  if (userId !== post.id) return { errCode: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });

  return true;
};

module.exports = {
  create,
  getAll,
  getByPostId,
  update,
  remove,
  getByQuery,
};