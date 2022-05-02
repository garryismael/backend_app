const { registerSchema } = require('../validators/user');
const joi_errors = require('../utils/error');

const status = require('http-status');
const { findOneBy } = require('../repository/user');

const valid_registration = (req, res, next) => {
  const validation = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json({ errors: validation.error });
  next();
};

const unique_email = async (req, res, next) => {
  const user = await findOneBy({ email: req.body.email });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: joi_errors("L'email existe déjà.", 'email'),
    });
  }
  next();
};

const unique_username = async (req, res, next) => {
  const user = await findOneBy({ username: req.body.username });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: joi_errors("Le nom d'utilisateur existe déjà", 'username'),
    });
  }
  next();
};

module.exports = {
  valid_registration,
  unique_email,
  unique_username,
};

