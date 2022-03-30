const { User } = require('../models');
const { loginValidation } = require('../helpers/joiValidations');
const { createToken } = require('../auth/createAndValidadeToken');

const login = async ({ email, password }) => {
  const { error } = await loginValidation({ email, password });

  if (error) return { errCode: 400, message: error.message };

  const userExist = await User.findAll({ where: { email } });

  if (userExist.length === 0) {
    return { errCode: 400, message: 'Invalid fields' };
  }

  const token = createToken({ email, password, userId: userExist[0].id });

  return token;
};

module.exports = {
  login,
};