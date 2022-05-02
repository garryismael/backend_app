const status = require('http-status');
const User = require('../models/user');
const { getLoggedUser, getUserByEmail } = require('../repository/user');
const { verifyToken, checkPassword } = require('../utils/auth');
const { loginSchema } = require('../validators/user');

const login_required = async (req, res, next) => {
  const auth = req.headers.authorization;
  let logged = false;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);
    const tokenData = verifyToken(token);
    if (tokenData) {
      const { user_id, email } = tokenData;
      const user = await getLoggedUser(user_id, email);
      if (user) {
        logged = true;
      }
    }
  }
  if (logged) next();
  else return res.status(status.UNAUTHORIZED).send();
};

const login_form_required = async (req, res, next) => {
  const validation = loginSchema.validate(req.body, { abortEarly: false });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json({
      error: validation.error,
    });
  else next();
};

const login_user_required = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  const password = req.body.password;
  let can_login = user !== null;
  if (can_login && checkPassword(password, user.password)) {
    res.locals.user = user;
    next();
  } else return res.status(status.UNAUTHORIZED).send();
};

const user_activation_required = async (req, res, next) => {
  const tokenData = verifyToken(req.params.token);
  let verified = false;
  if (tokenData) {
    const { id } = tokenData;
    const user = await User.findByPk(id);
    if (user !== null) {
      verified = true;
      res.locals.user = user;
    }
  }
  if (verified) next();
  else return res.status(status.BAD_REQUEST).send();
};

module.exports = {
  login_required,
  login_form_required,
  login_user_required,
  user_activation_required,
};

