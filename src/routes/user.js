const express = require('express');
const { loginRequired } = require('../middlewares/auth');
const { allUsers, activeUser } = require('../controllers/user');
const router = express.Router();

router.get('', loginRequired, allUsers);
router.get('/me', loginRequired, activeUser);
module.exports = router;
