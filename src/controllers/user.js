const User = require('../models/user');
const { hashPassword } = require('../utils/auth');

const register = async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  const user = User.build(req.body);
  await user.save();
  return res.status(201).send();
};

module.exports = {
  register,
};

