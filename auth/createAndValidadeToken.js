const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.sign(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    return { errCode: 401, message: error.message };
  }
};

module.exports = {
  createToken,
  validateToken,
};