
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary(); // Create a unique ID for the theater
    table.string("name"); // The name of the theater
    table.string("address_line_1"); // The first line of the address of the theater
    table.string("address_line_2"); // The second line of the address of the theater
    table.string("city"); // The city in which the theater is located
    table.string("state"); // The state in which the theater is located
    table.string("zip"); // The zip in which the theater is located
    table.timestamp(true, true);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable("theaters"); // Drop "theaters" table
};
