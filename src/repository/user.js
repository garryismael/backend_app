const User = require('../models/user');

const findOneBy = async (search) => {
  return await User.findOne({
    where: search,
  });
};

module.exports = {
  findOneBy,
};

