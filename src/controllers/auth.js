const status = require('http-status');
const {
  generateToken,
  getUserWithoutPassword,
  hashPassword,
  sendEmailForRegistration,
  sendEmailForResetPassword,
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

const activeAccount = async (req, res) => {
  const user = res.locals.user;
  user.estverifie = true;
  await user.save();
  return res.status(status.OK).send();
};

// Send Email For Reseting Password
const confirmEmail = async (req, res) => {
  const user = res.locals.user;
  await sendEmailForResetPassword(user);
  return res.status(status.OK).json({
    user: getUserWithoutPassword(user),
  });
};

const changePassword = async (req, res) => {
  const user = res.locals.user;
  user.password = hashPassword(req.body.newPassword);
  await user.save();
  return res.status(status.OK).send();
};

module.exports = {
  register,
  login,
  activeAccount,
  changePassword,
  confirmEmail,
};

