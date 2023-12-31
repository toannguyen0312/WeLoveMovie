
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable(); // A reference ID to a particular movie
    table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("cascade");
    table.integer("theater_id").unsigned().notNullable(); // A reference ID to a particular movie
    table
        .foreign("theater_id")
        .references("theater_id")
        .inTable("theaters")
        .onDelete("cascade");
    table.boolean("is_showing"); // A representation of whether or not the movie is currently showing in the referenced theater
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
