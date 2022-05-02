const express = require('express');
const { login_required } = require('../middlewares/auth');
const { get_users } = require('../controllers/user');
const router = express.Router();


router.get('/', login_required, get_users);

module.exports = router;