const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Creating nested critic object for the data object returned by read()
const addNestedCriticObject = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function update(updatedReview) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function read(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addNestedCriticObject);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  update,
  read,
  destroy,
};