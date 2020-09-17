var express = require('express');
var router = express.Router();

var Activity = require('../models/activity');
var Type = require('../models/types');

router.post('/api/activity', function(req, res, next) {
    var activity = new Activity(req.body);

    activity.save(function(err, activity) {
        if (err) {
            return next(err);
        }
        res.status(201).json(activity);
    });
});


// filter the groups by type
router.get('/api/activity', function(req, res, next){
    var filter = req.query.activity_type;

    Activity.find(function(err, activity){
        if(err){
            return next(err);
        }
        if(filter){
            res.json(activity.filter (function (e) {
                return filter === e.activity_type;
            }));
        } else {
            res.json(activity);
        }
    });
});



// create the body of a sub resource
router.post('/api/activity/types', function(req, res, next){
    var activity = new Type(req.body);

    activity.save(function(err, activity) {
        if (err) {
            return next(err);
        }
        res.status(201).json(activity);
    });
});


// return the sub resource
router.get('/api/activity/types', function(req, res, next){
    Type.find(function(err, activity){
        if(err){
            return next(err);
        }
        res.json({
            'activity/types': activity
        });
    });
});

router.get('/api/activity/:id', function(req, res, next){
    var id = req.params.id;
    Activity.findById(id, function (err, activity){
        if(err){
            return next(err);
        }
        if (activity === null){
            return res.status(404).json({'message': 'Activity not found '});
        }
        res.json(activity);
    });
});


router.delete('/api/activity/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findOneAndDelete(id, function(err, activity){
        if (err) {
            return next(err);
        }
        if (activity === null) {
            return res.status(404).json({'message': 'activity not found'});
        }
        console.log('Successfully deleted the document');
        res.json();
    });
});

router.delete('/api/activity/', function(req, res, next) {
    Activity.deleteMany(function(err, activity){
        if (err) {
            return next(err);
        }
        if (activity === null) {
            return res.status(404).json({'message': 'activity not found'});
        }
        console.log('Successfully deleted all documents');
        res.json();
    });
});

router.put('/api/activity/:id', function(req, res, next) {
    var id = req.params.id;
    var newValues ={$set: {
        name:req.body.name,
        activity_type :req.body.activity_type }};

    // we dont specify the id again as an argument
    Activity.updateOne( newValues,
        function(err, activity){
            if (err) {
                return next(err);
            }
            if (activity === null) {
                return res.status(404).json({'message': 'activity not found'});
            }

            res.json(activity);

        });
});


router.put('/api/activity/:id', function(req, res, next) {
    var newValues ={$set: {
        name:req.body.name,
        activity_type :req.body.activity_type }};

    // we dont specify the id again as an argument
    Activity.updateOne( newValues,
        function(err, activity){
            if (err) {
                return next(err);
            }
            if (activity === null) {
                return res.status(404).json({'message': 'activity not found'});
            }

            res.json(activity);

        });
});

// updates the whole file not part of it
router.patch('/api/activity/:id', function(req, res, next) {
    var id = req.params.id;
    var activity = req.body;

    var originalActivity = activity[id];
    var newValues ={$set: {
        name: (req.body.name || originalActivity.name),
        activity_type : (req.body.activity_type || originalActivity.activity_type)}
    };

    Activity.update(id, newValues,
        function(err, activity){
            if (err) {
                return next(err);
            }
            if (activity === null) {
                return res.status(404).json({'message': 'activity not found'});
            }
            activity[id] = newValues;
            res.json(newValues);

        });
});

module.exports = router;
