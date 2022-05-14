const express = require('express');
const {
  register,
  activeAccount,
  login,
  confirmEmail,
  changePassword,
  imageUrl,
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
  checkUploadImageForm,
} = require('../middlewares/user');

const router = express.Router();

router.post(
  '/register',
  [checkRegistrationForm, checkUploadImageForm, IsUniqueEmail],
  register
);
router.post('/login', [checkLoginForm, checkLoginUser], login);
router.post('/send-email-verification', [checkEmail, checkUser], confirmEmail);
router.post(
  '/reset-password/:token',
  [checkPasswords, checkResetPasswordToken, checkOldPassword],
  changePassword
);
router.post('/email-verify/:token', checkToken, activeAccount);
router.get('/profile/:name', imageUrl);

module.exports = router;

