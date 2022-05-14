const path = require("path");
require("dotenv").config({
  path: path.resolve("./" + "./.env"),
});
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const upload = require("express-fileupload");

const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const articleRouter = require("./src/routes/article");
const forfaitRouter = require("./src/controllers/forfait");

const sequelize = require("./src/config/database");

const app = express();

app.use(logger("dev"));
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/forfait", forfaitRouter);

(async function () {
  sequelize.sync({ force: true });
})();

module.exports = app;
