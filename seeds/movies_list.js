const moviesList = require("../seed_data/samplemovielist");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("movie_lists").del();
  await knex("movie_lists").insert(moviesList);
};
