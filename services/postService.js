const { BlogPost, Categorie, User } = require('../models');
const { postValidation } = require('../helpers/joiUserValidation');
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
      { model: Categorie, as: 'categories' },
    ],
  });

  return posts;
};

const getByPostId = async ({ id }) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });

  if (!post) return { errCode: 404, message: 'Post does not exist' };

  return post;
};

module.exports = {
  create,
  getAll,
  getByPostId,
};