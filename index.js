require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const movieListsRoute = require("./routes/movieLists");

const movieListsRoute = require("./routes/movieList");

app.use(express.json());

app.use("/movie-lists", movieListsRoute);

app.listen(8080);
