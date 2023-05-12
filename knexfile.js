require("dotenv").config();

// const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const urlDB = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

// const connection = mysql.createConnection(urlDB);

module.exports = require("knex")({
  // client: "mysql",
  connection: urlDB,
});
