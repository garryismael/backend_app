const express = require('express');
const { login_required } = require('../middlewares/auth');
const { getUsers } = require('../controllers/user');
const router = express.Router();


router.get('/', login_required, getUsers);

module.exports = router;