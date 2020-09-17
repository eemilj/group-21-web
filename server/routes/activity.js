const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activity');

router.get('/:activity', activityController.getActivity); 

module.exports = router;
