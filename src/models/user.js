const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define(
  'users',
  {
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: "admin",
      allowNull: false,
      validate: {
        isIn: [["admin", "client"]]
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Utilisé pour la registration
    estverifie: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
    createdAt: false,
    timestamps: false,
    tableName: 'users',
  }
);

module.exports = User;

