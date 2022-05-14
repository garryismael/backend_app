const { Sequelize } = require("../config/database");
const forfait = require("./../models/forfait");

const Router = require("express").Router();

Router.get(async (req, res) => {
  return res.json(await forfait.findAll());
});

Router.get(async (Req, res) => {

  return res.json(await forfait.findOrFail({}));
});

module.exports = Router;
