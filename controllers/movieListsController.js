const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

const getMovieList = (_req, res) => {
  knex("movie_lists")
    .join(
      "single_movie_list",
      "movie_lists.id",
      "single_movie_list.movie_lists_id"
    )
    .select(
      "movie_lists.id",
      "movie_lists.name",
      "movie_lists.description",
      "movie_lists.number_of_movies",
      "single_movie_list.movie_lists_id",
      "single_movie_list.image_url"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouses ${err}`);
    });
};

const getOneList = (req, res) => {
  knex("movie_lists")
    .join(
      "single_movie_list",
      "movie_lists.id",
      "single_movie_list.movie_lists_id"
    )
    .where({ movie_lists_id: parseInt(req.params.id) })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouse ${err}`);
    });
};

const addMovieList = (req, res) => {
  req.body.id = uuidv4();
  if (!req.body.name || !req.body.description || !req.body.number_of_movies) {
    return res
      .status(400)
      .send(
        "Please provide the required name and description of the new movie list"
      );
  } else {
    knex("movie_lists")
      .insert({
        name: req.body.name,
        description: req.body.description,
        number_of_movies: req.body.number_of_movies,
      })
      .then((id) => {
        for (let i = 0; i < req.body.number_of_movies; i++) {
          knex("single_movie_list")
            .insert({
              id: uuidv4(),
              movie_name: req.body.movie_name[i],
              release_year: req.body.release_year[i],
              movie_lists_id: id,
              image_url: req.body.image_url[i],
              backdrop_url: req.body.backdrop_url[i],
            })
            .then((newMovies) => {
              res.json(newMovies);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
};

const updateMovieList = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.number_of_movies) {
    return res
      .status(400)
      .send(
        "Please make sure to provide the required name and description of the updated movie list"
      );
  } else {
    knex("movie_lists")
      .where({ id: req.params.id })
      .update({
        name: req.body.name,
        description: req.body.description,
        number_of_movies: req.body.number_of_movies,
      })
      .then(() => {
        for (let i = 0; i < req.body.number_of_movies; i++) {
          knex("single_movie_list")
            .where({ movie_lists_id: req.params.id })
            .delete()
            .then(() => {
              knex("single_movie_list")
                .insert({
                  id: uuidv4(),
                  movie_name: req.body.movie_name[i],
                  release_year: req.body.release_year[i],
                  movie_lists_id: req.params.id,
                  image_url: req.body.image_url[i],
                  backdrop_url: req.body.backdrop_url[i],
                })
                .then((data) => {
                  res
                    .status(204)
                    .send(`Movie list ${data} updated  successfully!`);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
      });
  }
};

const deleteMovieList = (req, res) => {
  const newId = parseInt(req.params.id);
  knex("movie_lists")
    .where({ id: newId })
    .delete()
    .then(() => {
      res
        .status(204)
        .send(
          `The selected movie list with id: ${newId} has been successfully deleted`
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
  getOneList,
  addMovieList,
  updateMovieList,
  deleteMovieList,
};
