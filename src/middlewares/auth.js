const status = require('http-status');
const { findOneBy } = require('../repository/user');
const {
  verifyToken,
  checkPassword,
  IsNewUser,
  IsNotNullUser,
  checkTokenUserFactory,
} = require('../utils/auth');
const { resetPasswordSchema, emailSchema } = require('../validators/auth');
const { loginSchema } = require('../validators/user');

const JoiErrors = require('../utils/error');
const loginRequired = async (req, res, next) => {
  const auth = req.headers.authorization;
  let logged = false;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);
    const tokenData = verifyToken(token);
    if (tokenData) {
      const { user_id, email } = tokenData;
      const user = await findOneBy({ id: user_id, email, estverifie: true });
      if (user) {
        res.locals.user = user;
        logged = true;
      }
    }
  }
  if (!logged) return res.status(status.UNAUTHORIZED).send();
  next();
};

const checkLoginForm = async (req, res, next) => {
  const validation = loginSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(status.BAD_REQUEST).json({
      error: validation.error,
    });
  }
  next();
};

const checkLoginUser = async (req, res, next) => {
  const user = await findOneBy({ username: req.body.username });
  const password = req.body.password;
  let can_login = user !== null;
  if (can_login && checkPassword(password, user.password)) {
    res.locals.user = user;
    next();
  } else return res.status(status.BAD_REQUEST).send();
};

const checkToken = async (req, res, next) => {
  const verified = await checkTokenUserFactory(req, res, IsNewUser);
  if (!verified) res.status(status.BAD_REQUEST).send();
  next();
};

// Send Email Verification For Reset Password
const checkEmail = async (req, res, next) => {
  const validation = emailSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json(validation.error);
  next();
};

const checkUser = async (req, res, next) => {
  const user = await findOneBy({ email: req.body.email });
  if (!user) return res.status(status.NOT_FOUND).send();
  res.locals.user = user;
  next();
};

// Reset Password
const checkPasswords = async (req, res, next) => {
  const validation = resetPasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error)
    return res.status(status.BAD_REQUEST).json(validation.error);
  next();
};

// checkResetPasswordToken
const checkResetPasswordToken = async (req, res, next) => {
  const verified = await checkTokenUserFactory(req, res, IsNotNullUser);
  if (!verified) res.status(status.BAD_REQUEST).send();
  next();
};

const checkOldPassword = async (req, res, next) => {
  const user = res.locals.user;
  const checked = checkPassword(req.body.password, user.password);
  if (!checked)
    return res
      .status(status.BAD_REQUEST)
      .json(JoiErrors('Le mot de passe est incorrect.', 'password'));
  next();
};

module.exports = {
  loginRequired,
  checkLoginForm,
  checkLoginUser,
  checkToken,
  checkEmail,
  checkUser,
  checkPasswords,
  checkResetPasswordToken,
  checkOldPassword,
};

