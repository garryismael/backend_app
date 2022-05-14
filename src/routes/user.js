const express = require("express");
const { loginRequired } = require("../middlewares/auth");
const { allUsers, activeUser, editUser } = require("../controllers/user");
const {
	checkEditionForm,
	checkUploadImageForm,
} = require("../middlewares/user");
const router = express.Router();

router.get("", loginRequired, allUsers);
router.get("/me", loginRequired, activeUser);
router.post(
	"/:id",
	loginRequired,
	[checkEditionForm, checkUploadImageForm],
	editUser,
);

module.exports = router;

