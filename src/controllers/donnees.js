const httpStatus = require("http-status");
const { Forfait, Donnees } = require("../models/model");

const detaDrive = require("../config/deta_donnees");

const uploadDonnees = async (req, res) => {
	const user = res.locals.user;
	const path = res.locals.path;
	const taille = res.locals.taille;
	const type = res.body.type;
	const data = {
		userId: user.id,
		path,
		type,
		user,
		taille,
	};
	const content = req.files.path.data;

	await detaDrive.put(path, { data: content });

	const donnees = Donnees.build(data);
	await donnees.save();
	res.status(httpStatus.CREATED).send();
};

const getDonnees = async (req, res) => {
	const user = res.locals.user;
	const forfaits = await Forfait.findAll({
		where: {
			userId: user.id,
		},
	});
	res.status(httpStatus.OK).json({
		forfaits,
	});
};

module.exports = {
	uploadDonnees,
	getDonnees,
};

