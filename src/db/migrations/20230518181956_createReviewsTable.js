
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary(); // A unique ID for the review
    table.text("content"); // The content of the review, written in markdown
    table.integer("score"); // A numerical respresentation of the score given to the movie by the critic
    table.integer("critic_id").unsigned().notNullable();
    table
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("cascade"); // A reference ID to a particular critic
    table.integer("movie_id").unsigned().notNullable();
    table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("cascade"); // A reference ID to a particular movie
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews"); // Drop review table
};
