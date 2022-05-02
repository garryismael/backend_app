const express = require('express');
const { register, user_activation, login } = require('../controllers/auth');
const {
  valid_token,
  login_form_required,
  login_user_required,
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

router.get('/email-verify/:token', valid_token, user_activation);

router.post('/login', [login_form_required, login_user_required], login);
module.exports = router;

