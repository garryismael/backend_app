const { Sequelize } = require("sequelize");

const db_user = process.env.DATABASE_USER;
const db_password = process.env.DATABASE_PASSWORD;
const db_host = process.env.DATABASE_HOST;
const db_name = process.env.DATABASE_NAME;

module.exports = new Sequelize(db_name, db_user, db_password, {
	host: db_host,
	logging: false,
});

