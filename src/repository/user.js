const {User} = require('../models/model');

const findOneBy = async (search) => {
  return await User.findOne({
    where: search,
  });
};

module.exports = {
  findOneBy,
};

