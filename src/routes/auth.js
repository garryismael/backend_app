const express = require("express");
const {
	register,
	activeAccount,
	login,
	confirmEmail,
	changePassword,
	imageUrl,
} = require("../controllers/auth");
const {
	checkToken,
	checkLoginForm,
	checkLoginUser,
	checkUser,
	checkEmail,
	checkPasswords,
	checkResetPasswordToken,
} = require("../middlewares/auth");
const { checkForfait } = require("../middlewares/forfait");
const {
	checkRegistrationForm,
	IsUniqueEmail,
	checkUploadImageForm,
} = require("../middlewares/user");

const router = express.Router();

router.post(
	"/register",
	[checkRegistrationForm, checkUploadImageForm, IsUniqueEmail, checkForfait],
	register,
);
router.post("/email-verify/:token", checkToken, activeAccount);

router.post("/login", [checkLoginForm, checkLoginUser], login);
router.post("/send-email-verification", [checkEmail, checkUser], confirmEmail);
router.post(
	"/reset-password/:token",
	[checkPasswords, checkResetPasswordToken],
	changePassword,
);
router.get("/profile/:name", imageUrl);

module.exports = router;

