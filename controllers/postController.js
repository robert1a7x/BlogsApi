const postService = require('../services/postService');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const newPost = await postService.create({ title, content, categoryIds }, token);

  if (newPost.errCode) return next(newPost);

  return res.status(201).json(newPost); 
};

module.exports = {
  create,
};