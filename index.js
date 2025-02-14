require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const movieListsRoute = require("./routes/movieLists");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/movie-lists", movieListsRoute);

app.listen(3001);
