const express = require('express');
const {
  register,
  activeAccount,
  login,
  confirmEmail,
  changePassword,
} = require('../controllers/auth');
const {
  valid_token,
  login_form_required,
  login_user_required,
  valid_user,
  valid_email,
  valid_reset_password,
  valid_old_password,
  valid_token_reset_password,
} = require('../middlewares/auth');
const {
  valid_registration,
  unique_email,
  unique_username,
} = require('../middlewares/user');

const router = express.Router();

router.post(
  '/register',
  [valid_registration, unique_email, unique_username],
  register
);
router.post('/login', [login_form_required, login_user_required], login);
router.post(
  '/send-email-verification',
  [valid_email, valid_user],
  confirmEmail
);
router.post(
  '/reset-password/:token',
  [valid_reset_password, valid_token_reset_password, valid_old_password],
  changePassword
);
router.get('/email-verify/:token', valid_token, activeAccount);

module.exports = router;

