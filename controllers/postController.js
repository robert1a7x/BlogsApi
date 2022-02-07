const postService = require('../services/postService');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const newPost = await postService.create({ title, content, categoryIds }, token);

  if (newPost.errCode) return next(newPost);

  return res.status(201).json(newPost); 
};

const getAll = async (_req, res) => {
 const posts = await postService.getAll();

 return res.status(200).json(posts);
};

const getByPostId = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.getByPostId({ id });

  if (post.errCode) return next(post);

  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getByPostId,
};