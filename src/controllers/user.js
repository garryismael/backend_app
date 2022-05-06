const httpStatus = require('http-status');
const User = require('../models/user');
const { getUserWithoutPassword } = require('../utils/auth');

// lister les utilisateurs
const allUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
  });
  return res.status(httpStatus.OK).json(users);
};

const activeUser = async (req, res) => {
  const user = res.locals.user;
  return res.status(httpStatus.OK).json(getUserWithoutPassword(user));
};

module.exports = {
  allUsers,
  activeUser
};

