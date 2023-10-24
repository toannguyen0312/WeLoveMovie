const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

function list() {
    return knex("movies").select("*");
}

function listMovieWithIsShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true})
        .distinct("m.movie_id")
        .orderBy("m.movie_id");
}

function read(movie_id) {
    return knex("movies").select("*").where({movie_id}).first();
}

function readMovieIsShowingTheater(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.*")
        .where({"mt.movie_id": movie_id})
        .orderBy("t.theater_id");
}

const add_critic = reduceProperties("review_id", {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    created_at: ["critic", "created_at"],
    updated_at: ["critic", "updated_at"]
});

function readMovieIsShowingReview(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({"r.movie_id": movie_id})
        .then(add_critic);
}

module.exports = {
list,
listMovieWithIsShowing,
read,
readMovieIsShowingTheater,
readMovieIsShowingReview,
};