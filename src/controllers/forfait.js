const { Sequelize } = require("../config/database");
const forfait = require("./../models/forfait");
const { param, validationResult } = require("express-validator");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  return res.json(await forfait.findAll());
});

Router.get("/:id", param("id").isNumeric(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.json(await forfait.findOrFail({}));
});

module.exports = Router;
