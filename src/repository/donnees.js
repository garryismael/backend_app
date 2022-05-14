const { Donnees, User } = require("../models/model");
const sequelize = require('../config/database');


const sommeTaille = async (user) => {
    const data = await Donnees.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('taille')), 'tailles']],
        raw: true,
        include: [{
            model: User,
            through: {
                where: { userId: user.id}
            }
        }]
    });
    return data.tailles;
}

module.exports = {
    sommeTaille
}