const express = require('express');
const { loginRequired } = require('../middlewares/auth');
const { allUsers } = require('../controllers/user');
const router = express.Router();


router.get('/', loginRequired, allUsers);

module.exports = router;