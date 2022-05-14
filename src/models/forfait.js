const { DataTypes } = require("sequelize");
const { Sequelize } = require("../config/database");
const sequelize = require("../config/database");

const Forfait = sequelize.define(
  "forfait",
  {
    forfait_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeData: {
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
  }
);

module.exports = Forfait;
