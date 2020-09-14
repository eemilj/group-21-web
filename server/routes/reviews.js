const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviews');

router.get('/:reviews', reviewController.getReviews);

module.exports = router;