const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

const getMovieList = (req, res) => {
  knex("movie_lists")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouses ${err}`);
    });
};

const addMovieList = (req, res) => {
  req.body.id = uuidv4();
  if (!req.body.name || !req.body.description || !req.body.number_of_movies) {
    return res
      .status(400)
      .send(
        "Please provide the required Name and Description of the new Movie List"
      );
  } else {
    knex("movie_lists")
      .where({ id: req.body.id })
      .then(() => {
        res.status(201).location(`/movie-lists`).send(req.body);
      })
      .catch((err) => {
        res.status(400).json({
          message: `Error in creating new movie list ${err}`,
        });
      });
  }
};

const deleteMovieList = (req, res) => {
  knex("movie_lists")
    .where({ id: req.params.id })
    .delete()
    .then(() => {
      res
        .status(204)
        .send(
          `The selected movie list with id: ${req.params.id} has been successfully deleted`
        );
    })
    .catch((err) =>
      res
        .status(404)
        .send(`Error deleting the selected movie list ${req.params.id} ${err}`)
    );
};

module.exports = {
  getMovieList,
  addMovieList,
  deleteMovieList,
};
