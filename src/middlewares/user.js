const { registerSchema } = require("../validators/user");
const JoiErrors = require("../utils/error");

const status = require("http-status");
const { findOneBy } = require("../repository/user");

const checkRegistrationForm = (req, res, next) => {
	const validation = registerSchema.validate(req.body, {
		abortEarly: false,
	});
	if (validation.error)
		return res
			.status(status.BAD_REQUEST)
			.json({ errors: validation.error });
	next();
};

const checkUploadImageForm = (req, res, next) => {
	const message = "L'image est réquis.";
	!req.files && !req.files.image
		? res.status(status.BAD_REQUEST).json({ errors: JoiErrors(message, "image") }) : next();
};

const IsUniqueEmail = async (req, res, next) => {
	const user = await findOneBy({ email: req.body.email });
	if (user !== null) {
		return res.status(status.BAD_REQUEST).json({
			error: JoiErrors("L'email existe déjà.", "email"),
		});
	}
	next();
};

module.exports = {
	checkRegistrationForm,
	IsUniqueEmail,
	checkUploadImageForm,
};

