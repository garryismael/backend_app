const fs = require("fs");
const httpStatus = require("http-status");
const JoiError = require("../utils/error");
const { sommeTaille } = require("../repository/donnees");
const { donneeSchema } = require("../validators/donnees");
const { Forfait } = require("../models/model");

const checkType = (req, res, next) => {
	const validate = donneeSchema.validate(req.body);
	validate.error
		? res.json(httpStatus.BAD_REQUEST).json({
				error: validate.error,
		  })
		: next();
};

const checkForfaitType = async (req, res, next) => {
	const type = req.body.type;
	const forfait = await Forfait.findByPk(user.locals.forfaitId);
	const type_donnees = forfait.typeData.split(',');
	if (!(type in type_donnees)) {
		res.json(httpStatus.BAD_REQUEST).json({
			error: JoiError('Le type ne correspond pas aux types proposés.')
		})
	} else {
		next();
	}
}
const checkPath = async (req, res, next) => {
	if (!req.files) {
		res.status(httpStatus.BAD_REQUEST).json({
			error: JoiError("Pas de image.", "path"),
		});
	} else {
		const filename = req.files.path.name;
		res.path = filename;
		next();
	}
};

const checkTaille = async (req, res, next) => {
	const donnees = req.files.donnees.data;
	const taille = (await fs.promises.stat(donnees)).size;
	const total_taille = sommeTaille(res.locals.user);

	if (total_taille < taille) {
		res.status(httpStatus.BAD_REQUEST).json({
			error: JoiError("Taille excede", "taille"),
		});
	} else {
		res.taille = taille;
		next();
	}
};

module.exports = {
	checkTaille,
	checkPath,
	checkType,
	checkForfaitType
};

