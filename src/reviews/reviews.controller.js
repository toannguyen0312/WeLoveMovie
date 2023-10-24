const service = require("./reviews.service");
const asyncErrorBoundary  = require("../errors/asyncErrorBoundary");

async function reviewExist(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({status:404, message: "Review cannot be found."});
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    
    await service.update(updatedReview)
    const data = await service.read(res.locals.review.review_id);
    res.json({ data });
}

async function destroy(req, res) {
    const { review } = res.locals;
    await service.destroy(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [ asyncErrorBoundary(reviewExist), asyncErrorBoundary(update)],
    delete: [ asyncErrorBoundary(reviewExist), asyncErrorBoundary(destroy)],
}