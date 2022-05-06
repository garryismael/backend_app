const { registerSchema } = require('../validators/user');
const JoiErrors = require('../utils/error');

const status = require('http-status');
const { findOneBy } = require('../repository/user');

const checkRegistrationForm = (req, res, next) => {
  const validation = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json({ errors: validation.error });
  next();
};

const IsUniqueEmail = async (req, res, next) => {
  const user = await findOneBy({ email: req.body.email });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: JoiErrors("L'email existe déjà.", 'email'),
    });
  }
  next();
};

const IsUniqueUsername = async (req, res, next) => {
  const user = await findOneBy({ username: req.body.username });
  if (user !== null) {
    return res.status(status.BAD_REQUEST).json({
      error: JoiErrors("Le nom d'utilisateur existe déjà", 'username'),
    });
  }
  next();
};

module.exports = {
  checkRegistrationForm,
  IsUniqueEmail,
  IsUniqueUsername,
};

