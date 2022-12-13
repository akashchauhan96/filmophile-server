const knex = require("knex")(require("../knexfile"));
const e = require("express");
const { v4: uuidv4 } = require("uuid");

const getMovieList = (req, res) => {
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
      console.log(res.data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouses ${err}`);
    });
};
("Error retrieving warehouses Error: select `movie_lists`.`id`, `movie_lists`.`name`, `movie_lists`.`description`, `movie_lists`.`number_of_movies`, `single_movie_list`.`movies_lists_id`, `single_movie_list`.`image_url` from `movie_lists` inner join `single_movie_list` on `movie_lists`.`id` = `single_movie_list`.`movie_lists_id` - ER_BAD_FIELD_ERROR: Unknown column 'single_movie_list.movies_lists_id' in 'field list'");

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
        console.log(id);
        for (let i = 0; i < req.body.number_of_movies; i++) {
          knex("single_movie_list")
            .insert({
              id: uuidv4(),
              name: req.body.movie_name[i],
              release_year: req.body.release_year[i],
              movie_lists_id: id,
              image_url: req.body.image_url[i],
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
