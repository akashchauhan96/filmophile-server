require("dotenv").config();
const mysql = require("mysql");

// const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const connection = mysql.createConnection(urlDB);

// Connect database with Knex
module.exports = connection;
