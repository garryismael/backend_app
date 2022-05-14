const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define(
  'users',
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

