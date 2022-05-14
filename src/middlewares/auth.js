const status = require("http-status");
const { findOneBy } = require("../repository/user");
const {
	verifyToken,
	checkPassword,
	IsNewUser,
	IsNotNullUser,
} = require("../utils/auth");
const { resetPasswordSchema, emailSchema } = require("../validators/auth");
const { loginSchema } = require("../validators/user");
const {User} = require("../models/model");

const JoiErrors = require("../utils/error");
const loginRequired = async (req, res, next) => {
	const auth = req.headers.authorization;
	let logged = false;
	if (auth && auth.startsWith("Bearer")) {
		const token = auth.slice(7);
		const tokenData = verifyToken(token);
		if (tokenData) {
			const { user_id, email } = tokenData;
			const user = await findOneBy({
				id: user_id,
				email,
			});
			if (user) {
				res.locals.user = user;
				logged = true;
			}
		}
	}
	!logged ? res.status(status.UNAUTHORIZED).send() : next();
};

const checkLoginForm = async (req, res, next) => {
	const validation = loginSchema.validate(req.body, {
		abortEarly: false,
	});
	validation.error
		? res.status(status.BAD_REQUEST).json({
				error: validation.error,
		  })
		: next();
};

const checkLoginUser = async (req, res, next) => {
	const user = await findOneBy({
		email: req.body.email,
	});
	const password = req.body.password;
	let can_login = user !== null;
	if (can_login && checkPassword(password, user.password)) {
		res.locals.user = user;
		next();
	} else res.status(status.BAD_REQUEST).send();
};

const checkToken = async (req, res, next) => {
	await checkTokenUserFactory(req, res, next, IsNewUser);
};

// Send Email Verification For Reset Password
const checkEmail = async (req, res, next) => {
	const validation = emailSchema.validate(req.body, {
		abortEarly: false,
	});
	validation.error
		? res.status(status.BAD_REQUEST).json(validation.error)
		: next();
};

const checkUser = async (req, res, next) => {
	const user = await findOneBy({
		email: req.body.email,
	});
	if (!user) res.status(status.NOT_FOUND).send();
	else {
		res.locals.user = user;
		next();
	}
};

const checkUserById = async (req, res, next) => {
	const user = await findOneBy({
		id: req.params.id,
	});
	if (!user) res.status(status.NOT_FOUND).send();
	else {
		res.locals.user = user;
		next();
	}
};

// Reset Password
const checkPasswords = async (req, res, next) => {
	const validation = resetPasswordSchema.validate(req.body, {
		abortEarly: false,
	});
	validation.error
		? res.status(status.BAD_REQUEST).json(validation.error)
		: next();
};

// checkResetPasswordToken
const checkResetPasswordToken = async (req, res, next) => {
	await checkTokenUserFactory(req, res, next, IsNotNullUser);
};

const checkOldPassword = async (req, res, next) => {
	const user = res.locals.user;
	const checked = checkPassword(req.body.password, user.password);
	if (checked) {
		next();
	} else {
		const message = "Le mot de passe est incorrect";
		res.status(status.BAD_REQUEST).json(JoiErrors(message, "password"));
	}
};

const checkTokenUserFactory = async (req, res, next, callback) => {
	const tokenData = verifyToken(req.params.token);
	if (tokenData) {
		const { id } = tokenData;
		const user = await User.findByPk(id);
		if (callback(user)) {
			res.locals.user = user;
			next();
			return;
		}
	}
	res.status(status.BAD_REQUEST).send();
};

module.exports = {
	loginRequired,
	checkLoginForm,
	checkLoginUser,
	checkToken,
	checkEmail,
	checkUser,
	checkPasswords,
	checkResetPasswordToken,
	checkOldPassword,
	checkUserById,
};

