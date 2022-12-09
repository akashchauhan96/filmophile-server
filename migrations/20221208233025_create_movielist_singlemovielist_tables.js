/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("movie_lists", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.integer("number_of_movies").notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable("single_movie_list", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("release_year").notNullable();
    table
      .uuid("movie_lists_id")
      .references("movie_lists.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("image_url").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("single_movie_list");
  await knex.schema.dropTable("movie_lists");
};
