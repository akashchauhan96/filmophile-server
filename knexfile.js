require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2", // Ensure this is specified
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.PORT || 3001,
    },
    migrations: {
      directory: "./migrations", // Ensure this points to your migrations folder
    },
  },
};
// const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
// const urlDB = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

// const connection = mysql.createConnection(urlDB);


