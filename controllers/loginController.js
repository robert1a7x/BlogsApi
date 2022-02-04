const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const loginToken = await loginService.login({ email, password });

  if (loginToken.errCode) return next(loginToken);

  return res.status(200).json({ token: loginToken });
};

module.exports = {
  login,
};