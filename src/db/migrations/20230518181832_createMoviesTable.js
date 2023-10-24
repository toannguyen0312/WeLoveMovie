
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary(); // (Primary Key) A unique ID for the movie
    table.string("title"); // The title of the movie
    table.integer("runtime_in_minutes"); // The length of the movie in minutes
    table.string("rating"); // The rating given to the movie
    table.text("description"); // A shortened description of the movie
    table.string("image_url"); // A URL to the movie's poster
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};
