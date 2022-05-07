const express = require('express');
const {
  register,
  activeAccount,
  login,
  confirmEmail,
  changePassword,
} = require('../controllers/auth');
const {
  checkToken,
  checkLoginForm,
  checkLoginUser,
  checkUser,
  checkEmail,
  checkPasswords,
  checkOldPassword,
  checkResetPasswordToken,
} = require('../middlewares/auth');
const {
  checkRegistrationForm,
  IsUniqueEmail,
  IsUniqueUsername,
} = require('../middlewares/user');

const router = express.Router();

router.post(
  '/register',
  [checkRegistrationForm, IsUniqueEmail, IsUniqueUsername],
  register
);
router.post('/login', [checkLoginForm, checkLoginUser], login);
router.post('/send-email-verification', [checkEmail, checkUser], confirmEmail);
router.post(
  '/reset-password/:token',
  [checkPasswords, checkResetPasswordToken, checkOldPassword],
  changePassword
);
router.get('/email-verify/:token', checkToken, activeAccount);

module.exports = router;

