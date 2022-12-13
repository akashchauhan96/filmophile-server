require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const movieListsRoute = require("./routes/movieLists");

app.use(express.json());

app.use(cors());

app.use("/movie-lists", movieListsRoute);

app.listen(8080);
