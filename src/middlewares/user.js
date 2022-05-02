const { registerSchema } = require('../validators/user');
const User = require('../models/user');
const joi_errors = require('../utils/error');

const status = require('http-status');

const register_middleware = (req, res, next) => {
  const validation = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json({ errors: validation.error });
  else next();
};

const unique_email = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: joi_errors("L'email existe déjà.", 'email'),
    });
  } else {
    next();
  }
};

const unique_username = async (req, res, next) => {
  const username = req.body.username;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: joi_errors("Le nom d'utilisateur existe déjà", 'username'),
    });
  } else {
    next();
  }
};
module.exports = {
  register_middleware,
  unique_email,
  unique_username,
};

