const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Eman1234",
  database: "foodiez_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
