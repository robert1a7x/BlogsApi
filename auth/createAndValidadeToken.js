const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createToken,
  validateToken,
};