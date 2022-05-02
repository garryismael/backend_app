const User = require('../models/user');

const getLoggedUser = async (user_id, email) => {
  const user = await User.findOne({
    where: {
      id: user_id,
      email,
    },
  });
  return user;
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

module.exports = {
  getLoggedUser,
  getUserByEmail,
};

