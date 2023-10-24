const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const movieIsShowing = req.query.is_showing;
    if(movieIsShowing === "true") {
        const data = await moviesService.listMovieWithIsShowing();
        res.json({ data });
    }

    const data = await moviesService.list();
    res.json({ data });
}

async function movieExist(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: "Movie cannot be found."})
}

function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}

async function movieIsShowingTheater(req, res, next) {
    const theater = await moviesService.readMovieIsShowingTheater(res.locals.movie.movie_id);
    res.json({ data: theater });
}

async function movieIsShowingReview(req, res, next) {
    const review = await moviesService.readMovieIsShowingReview(res.locals.movie.movie_id);
    res.json({ data: review})
}

module.exports = {
list: asyncErrorBoundary(list),
read: [ 
    asyncErrorBoundary(movieExist),
    read,
],
movieIsShowingTheater: [
    asyncErrorBoundary(movieExist),
    asyncErrorBoundary(movieIsShowingTheater),
],
movieIsShowingReview: [
    asyncErrorBoundary(movieExist),
    asyncErrorBoundary(movieIsShowingReview),
]
};