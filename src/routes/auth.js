const express = require('express');
const { register } = require('../controllers/user');
const {
  register_middleware,
  unique_email,
  unique_username,
} = require('../middlewares/user');
const router = express.Router();

/* GET users listing. */
router.post(
  '/register',
  [register_middleware, unique_email, unique_username],
  register
);

module.exports = router;

