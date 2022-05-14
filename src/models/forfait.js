const { DataTypes } = require("sequelize");
const { Sequelize } = require("../config/database");
const sequelize = require("../config/database");

const Forfait = sequelize.define("forfait", {
  forfait_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeData: {
    type: DataTypes.ARRAY,
    allowNull: false,
  },
  tailleMax: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  durationMax: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});
