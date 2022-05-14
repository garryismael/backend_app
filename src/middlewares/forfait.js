const httpStatus = require("http-status");
const { Forfait } = require("../models/model");

const checkForfait = async (req, res, next) => {
	const forfait = Forfait.findByPk(req.params.id);
	if (!forfait()) {
		res.status(httpStatus.NOT_FOUND);
	} else {
		next();
	}
};

module.exports = {
	checkForfait,
};
