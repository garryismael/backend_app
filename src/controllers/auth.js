const status = require('http-status');
const {
  generateToken,
  getUserWithoutPassword,
  hashPassword,
  sendEmailForRegistration,
} = require('../utils/auth');
const User = require('../models/user');

const register = async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  const user = User.build(req.body);
  await user.save();
  await sendEmailForRegistration(user);
  return res.status(status.OK).send();
};

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

const change_password = async (req, res) => {
  const user = res.locals.user;
  user.password = hashPassword(req.body.password);
  await user.save();
  return res.status(status.OK).send();
};

module.exports = {
  register,
  login,
  user_activation,
  change_password,
};

