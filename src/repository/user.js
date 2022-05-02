const User = require('../models/user');

const findBy = async (search) => {
  return await User.findOne({
    where: search,
  });
};

module.exports = {
  findBy,
};

