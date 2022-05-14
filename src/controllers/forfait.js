const { Forfait } = require("./../models/model");
const { param, validationResult, body } = require("express-validator");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  return res.json(await Forfait.findAll());
});

Router.get("/:id", param("id").isNumeric().notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return res.json(await Forfait.findOrFail({}));
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

    Forfait
      .create({
        ...req.body,
        typeData: req.body.typeData.toString(),
        emplacement: req.body.emplacement.toString(),
      })
      .then((forfait) => res.json(forfait));
  }
);

module.exports = Router;
