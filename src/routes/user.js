const express = require('express');
const { loginRequired } = require('../middlewares/auth');
const { allUsers, activeUser } = require('../controllers/user');
const router = express.Router();

router.get('', loginRequired, allUsers);
router.get('/me', loginRequired, activeUser);
router.get('/hello', (req, res) => {
  res.json({ hello: 'world' });
});
module.exports = router;

