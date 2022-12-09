require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

const movieListRoute = require("./routes/movieList");

app.use(express.json());

app.listen(8080);
