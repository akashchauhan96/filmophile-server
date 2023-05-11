require("dotenv").config();

// const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const urlDB = `mysql://root:EsZECG3dz8JNXNOAhV08@containers-us-west-136.railway.app:5471/railway`;

// Connect database with Knex
module.exports = {
  client: "mysql",
  connection: urlDB,
  // {
  //   host: "127.0.0.1",
  //   user: DB_USER,
  //   password: DB_PASSWORD,
  //   database: DB_NAME,
  //   charset: "utf8",
  // },
};
