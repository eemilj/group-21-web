var express = require('express');
var router = express.Router();

var ReviewSchema = require('../models/reviews');

router.post('/api/reviews', function(req, res, next) {
    var review = new ReviewSchema(req.body);

    review.date = Date.now();
    review.save(function(err) {
        if (err) { return next(err); } // pass error to next middleware
        res.status(201).json(review);
    });
});

router.get('/api/reviews', function(req, res, next) {
    ReviewSchema.find(function (err, reviews) {
        if (err) { return next(err); }
        res.json({"reviews": reviews});
    });
});

router.get('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    ReviewSchema.findById(req.params.id, function(err, review) {
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"}
            );
        }
        res.json(review);
    });
});

router.put('/api/reviews/:id', function (req, res, next) {
    var id = req.params.id;
    ReviewSchema.findById(id, function (err, review){
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json({"message": "Review not found"});
        }
        review.author = req.body.author;
        review.reviewee = req.body.reviewee;
        review.rating = req.body.rating;
        review.subject = req.body.subject;
        review.save();
        res.json(review);
    });
});

router.patch('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    ReviewSchema.findById(id, function (err, review){
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        review.author =(req.body.author || review.author);
        review.rating = (req.body.rating || review.rating);
        review.subject = (req.body.subject || review.subject);
        review.reviewee = (req.body.reviewee || review.reviewee);

        review.save();
        res.json(review);
    });
});

router.delete('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    ReviewSchema.findOneAndDelete({_id: id}, function(err, review){
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        res.json(review);
    });
});

module.exports = router;