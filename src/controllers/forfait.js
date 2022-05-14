const { Sequelize } = require("../config/database");
const forfait = require("./../models/forfait");
const { param, validationResult, body } = require("express-validator");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  return res.json(await forfait.findAll());
});

Router.get("/:id", param("id").isNumeric().notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.json(await forfait.findOne({ where: { id: req.params.id } }));
});
Router.post(
  "/",
  body("forfait_name").isString().isLength({ min: 4 }).notEmpty(),
  body("typeData").isArray().notEmpty(),
  body("tailleMax").isString().notEmpty().toInt(),
  body("durationMax").isString().notEmpty().toInt(),
  body("emplacement").isArray().notEmpty(),
  body("prix").isString().notEmpty().toInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    forfait
      .create({
        ...req.body,
        typeData: req.body.typeData.toString(),
        emplacement: req.body.emplacement.toString(),
      })
      .then((forfait) => res.json(forfait))
      .catch((e) => {
        res.json(e.errors);
      });
  }
);

Router.put(
  "/:id",
  param("id").isNumeric().notEmpty(),
  body("forfait_name").isString().isLength({ min: 4 }).notEmpty(),
  body("typeData").isArray().notEmpty(),
  body("tailleMax").isString().notEmpty().toInt(),
  body("durationMax").isString().notEmpty().toInt(),
  body("emplacement").isArray().notEmpty(),
  body("prix").isString().notEmpty().toInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    forfait
      .update(
        {
          ...req.body,
          typeData: req.body.typeData.toString(),
          emplacement: req.body.emplacement.toString(),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((forfait) => res.json(forfait));
  }
);

Router.delete("/:id", param("id").isNumeric().notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json(await forfait.destroy({ where: { id: req.params.id } }));
});

module.exports = Router;
