const httpStatus = require('http-status');
const User = require('../models/user');

// lister les utilisateurs
const get_users = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
  });
  return res.status(httpStatus.OK).json(users);
};

module.exports = {
  get_users,
};

