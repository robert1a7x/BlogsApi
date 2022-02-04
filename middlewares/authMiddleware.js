const { validateToken } = require('../auth/createAndValidadeToken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decode = validateToken(token);

  if (!decode) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  req.user = decode;

  next();
};

module.exports = authMiddleware;