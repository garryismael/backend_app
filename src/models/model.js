const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
	"users",
	{
		nom: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		prenom: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
	},
	{
		updatedAt: false,
		createdAt: false,
		timestamps: false,
		tableName: "users",
	},
);
const Donnees = sequelize.define(
	"donnees",
	{
		path: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		taille: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dateAjout: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
			allowNull: false,
		},
	},
	{
		updatedAt: false,
		createdAt: false,
		timestamps: false,
		tableName: "donnees",
	},
);

const Forfait = sequelize.define(
	"forfaits",
	{
		forfait_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		typeData: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		extensions: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tailleMax: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		durationMax: { type: DataTypes.INTEGER, allowNull: false },
		emplacement: { type: DataTypes.STRING, allowNull: false },
		prix: { type: DataTypes.STRING, allowNull: false },
	},
	{
		updatedAt: false,
		createdAt: false,
		timestamps: false,
		tableName: "forfaits",
	},
);

Forfait.hasMany(User);
User.belongsTo(Forfait);

User.hasMany(Donnees);
Donnees.belongsTo(User);

module.exports = {
	User,
	Forfait,
	Donnees,
};

