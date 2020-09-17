const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviews');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getOneReview);
router.post('/', reviewController.postReview);
router.put('/:id', reviewController.putReview);
router.patch('/:id', reviewController.patchReview);
router.delete('/:id', reviewController.deleteReview);
router.delete('/', reviewController.deleteAllReviews);



module.exports = router;