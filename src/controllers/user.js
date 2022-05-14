const httpStatus = require("http-status");
const drive = require("../config/deta");
const User = require("../models/user");
const { getUserWithoutPassword } = require("../utils/auth");

// lister les utilisateurs
const allUsers = async (req, res) => {
	const users = await User.findAll({
		attributes: { exclude: "password" },
	});
	res.status(httpStatus.OK).json(users);
};

const editUser = async (req, res) => {
	const filename = req.files.image.name;
	await drive.delete(user.image);
	const user = res.locals.user;
	user.nom = req.body.nom;
	user.prenom = req.body.prenom;
	user.email = req.body.email;
	user.image = filename;

	await user.save();
	res.status(httpStatus.OK).json({
		user: getUserWithoutPassword(user),
	});
};

const activeUser = async (req, res) => {
	const user = res.locals.user;
	res.status(httpStatus.OK).json(getUserWithoutPassword(user));
};

module.exports = {
	allUsers,
	activeUser,
	editUser,
};
