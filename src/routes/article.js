const express = require('express');
const { upload, download } = require('../controllers/article');

const router = express.Router();


router.post('/', upload);
router.get('/:name', download);

module.exports = router;