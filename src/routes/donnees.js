const express = require("express");
const { uploadDonnees } = require("../controllers/donnees");
const { loginRequired } = require("../middlewares/auth");
const { checkPath, checkType, checkTaille } = require("../middlewares/donnees");

const router = express.Router();

router.post(
	"/",
	[loginRequired, checkType, checkPath, checkTaille],
	uploadDonnees,
);

module.exports = router;

