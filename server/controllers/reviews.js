var express = require('express');
var router = express.Router();

var ReviewSchema = require('../models/reviews');
const postReview = (req, res, next) => {
    var review = new ReviewSchema(req.body);
    review.date = Date.now();
    review.save(function (err) {
        if (err) {
            return next(err);
        } // pass error to next middleware
        res.status(201).json(review);
    });
};

const getAllReviews = (req, res, next) => {
    var filter = req.query.reviewee;
    ReviewSchema.find(function(err, reviews, next){
        if(err){
            return next(err);
        }
        if(reviews.length === 0){
            return res.status(404).json({"message": "No reviews found"});
        }
        if(filter){
            res.json(reviews.filter(function (e) {
                return filter == e.reviewee;
            }));
        } else {
            res.json(reviews);
        }
    });
};

const getOneReview = (req, res, next) => {
    var id = req.params.id;
    ReviewSchema.findById(id, function (err, reviews) {
        if (err) {
            return next(err);
        }
        if (reviews == null) {
            return res.status(404).json(
                {"message": "Review not found"}
            );
        }
        res.json(reviews);
    });
};

// const putReview = (req, res, next)  => {
//     var id = req.params.id;
//     ReviewSchema.findById(id, function (err, review) {
//         if (err) {
//             return next(err);
//         }
//         if (review == null) {
//             return res.status(404).json({"message": "Review not found"});
//         }
//
//         review.author = req.body.author;
//         review.reviewee = req.body.reviewee;
//         review.rating = req.body.rating;
//         review.subject = req.body.subject;
//
//         review.save();
//         res.json(review);
//     });
// };

const putReview = (req, res) => {
    const id = req.params.id;
    ReviewSchema.findOneAndReplace({ _id: id },  req.body, { new: true }, (err, reviews) =>{
        if(reviews === null){
            return res.status(404).json({"message": "Review not found"});
        }
        if (err) {
            return res.status(500).json({"message": "Invalid input"});
        }
        res.json(reviews);
        });
};


const patchReview = (req, res) => {
    var id = req.params.id;
    ReviewSchema.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, reviews) => {
        if(reviews === null){
            return res.status(404).json({"message": "Review not found"});
        }
        if (err) {
            return res.status(500).json({"message": "Invalid input"});
        }
        res.json(reviews);
    });
};

// const patchReview = (req, res, next) => {
//     var id = req.params.id;
//     ReviewSchema.findById(id, function (err, review) {
//         if (err) {
//             return next(err);
//         }
//         if (review == null) {
//             return res.status(404).json(
//                 {"message": "Review not found"});
//         }
//         review.author = (req.body.author || review.author);
//         review.rating = (req.body.rating || review.rating);
//         review.subject = (req.body.subject || review.subject);
//         review.reviewee = (req.body.reviewee || review.reviewee);
//
//         review.save();
//         res.json(review);
//     });
// };

const deleteReview = (req, res, next) => {
    var id = req.params.id;
    ReviewSchema.findOneAndDelete({_id: id}, function (err, reviews) {
        if (err) {
            return next(err);
        }
        if (reviews == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        res.json(reviews);
    });
};

const deleteAllReviews = (req, res, next) => {
    ReviewSchema.deleteMany(function(err, reviews){
        if (err) {
            return next(err);
        }
        if (reviews.n === 0){
            return res.status(404).json({"message": "No reviews found"})
        }
        return res.status(200).json(reviews);
    });
};

module.exports = {postReview,
getAllReviews,
getOneReview,
putReview,
patchReview,
deleteReview,
deleteAllReviews};