require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");

const movieListRoute = require("./routes/movieList");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

app.listen(8080);
