const express = require("express");
const router = express.Router();
const movieListsController = require("../controllers/movieListsController");

router
  .route("/")
  .get(movieListsController.getMovieList)
  .post(movieListsController.addMovieList);

router.route("/:id").delete(movieListsController.deleteMovieList);

module.exports = router;
