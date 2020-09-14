var express = require('express');
var router = express.Router();

var Activity = require('../models/activities');
var Users = require('../models/users');

router.post('/api/activities', function(req, res, next) {
    var activities = new Activity(req.body);

    activities.save(function(err, activities) {
        if (err) {
            return next(err);
        }
        res.status(201).json(activities);
    });
});


// filter the groups by type
router.get('/api/activities', function(req, res, next){
    var filter = req.query.activity_type;

    Activity.find(function(err, activities){
        if(err){
            return next(err);
        }
        if(filter){
            res.json(activities.filter (function (e) {
                return filter === e.activity_type;
            }));
        } else {
            res.json(activities);
        }
    });
});



// create the body of a sub resource
router.post('/api/activities/users', function(req, res, next){
    var activities = new Users(req.body);

    activities.save(function(err, activities) {
        if (err) {
            return next(err);
        }
        res.status(201).json(activities);
    });
});


// return the sub resource
router.get('/api/activities/users', function(req, res, next){
    Users.find(function(err, activities){
        if(err){
            return next(err);
        }
        res.json({
            'activities/users': activities
        });
    });
});

router.get('/api/activities/:id', function(req, res, next){
    var id = req.params.id;
    Activity.findById(id, function (err, activities){
        if(err){
            return next(err);
        }
        if (activities === null){
            return res.status(404).json({'message': 'Activity not found '});
        }
        res.json(activities);
    });
});


router.delete('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findOneAndDelete(id, function(err, activities){
        if (err) {
            return next(err);
        }
        if (activities === null) {
            return res.status(404).json({'message': 'activities not found'});
        }
        console.log('Successfully deleted the document');
        res.json();
    });
});

router.delete('/api/activities/', function(req, res, next) {
    Activity.deleteMany(function(err, activities){
        if (err) {
            return next(err);
        }
        if (activities === null) {
            return res.status(404).json({'message': 'activities not found'});
        }
        console.log('Successfully deleted all documents');
        res.json();
    });
});

router.put('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    var newValues ={$set: {
        name:req.body.name,
        activity_type :req.body.activity_type }};

    // we dont specify the id again as an argument
    Activity.updateOne( newValues,
        function(err, activities){
            if (err) {
                return next(err);
            }
            if (activities === null) {
                return res.status(404).json({'message': 'activities not found'});
            }

            res.json(activities);

        });
});


router.put('/api/activities/:id', function(req, res, next) {
    var newValues ={$set: {
        name:req.body.name,
        activity_type :req.body.activity_type }};

    // we dont specify the id again as an argument
    Activity.updateOne( newValues,
        function(err, activities){
            if (err) {
                return next(err);
            }
            if (activities === null) {
                return res.status(404).json({'message': 'activities not found'});
            }

            res.json(activities);

        });
});

/*
// updates the whole file not part of it
router.patch('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    var activities = req.body;
    var originalActivity = activities.findById(id);

    var newValues ={$set: {
        name: (req.body.name || originalActivity.name),
        activity_type : (req.body.activity_type || originalActivity.activity_type)}
    };
    Activity.update(id, newValues,
        function(err, activities){
            if (err) {
                return next(err);
            }
            if (activities === null) {
                return res.status(404).json({'message': 'activities not found'});
            }
            activities[id] = newValues;
            res.json(newValues);

        });
});




-----------------------------------
router.patch('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    activitySchema.findById(id, function (err, activities){
        if (err) { return next(err); }
        if (activities == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        }
        activities.username = (req.body.username || activities.username);
        activities.password = (req.body.password || activities.password);
        // TODO: Validation in order to only allow admins to change user's permissions

        activities.admin = (String(req.body.admin) || user.admin);
        activities.save();
        res.json(activities);
    });
});


*/

router.patch('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    var name = req.body ||  activities.username ;
    var type = req.body ||  activities.activity_type ;
    Activity.find(ac)
    var newValues ={$set: {
        name: name,
        activity_type : type
      }
    };

    Activity.update(id,newValues);


      res.json(newValues);
});





module.exports = router;
