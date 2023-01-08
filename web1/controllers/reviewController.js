const db = require("../models");

// model
const Review = db.reviews;

// function

// add review

const addReview = async (req, res) => {

    const id = req.params.id

    let data = {
        product_id: id,
        rating: req.body.rating,
        description: req.body.description
    }

    const review = await Review.create(data)
    res.status(200).send(review)

}

// get all review

const getAllReviews = async (req, res) => {
    const reviews = await Review.findAll();
    res.status(200).send(reviews);
}



module.exports = {
    addReview,
    getAllReviews

}