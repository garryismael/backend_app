const status = require('http-status');
const { generateToken, getUserWithoutPassword } = require('../utils/auth');

const login = async (req, res) => {
  const user = res.locals.user;
  const token = generateToken(user, '7h');
  return res.status(status.OK).json({
    token,
    user: getUserWithoutPassword(user),
  });
};

const user_activation = async (req, res) => {
  const user = res.locals.user;
  user.estverifie = true;
  await user.save();
  return res.status(status.OK).send();
};

module.exports = {
  login,
  user_activation,
};

