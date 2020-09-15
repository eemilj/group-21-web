var express = require('express');
var router = express.Router();

var Activity = require('../models/activities');
var Users = require('../models/users');

// create a new document
router.post('/api/activities', function(req, res) {
    var activities = new Activity({
        name: req.body.name,
        activity_type : req.body.activity_type
    });
    activities.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling post request to activities',
                createdActivity : result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



// filter the groups by type, if it exists if not return all
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

// return the document
router.get('/api/activities/:id', function(req, res){
    var id = req.params.id;
    Activity.findById(id)
        .exec()
        .then(doc=>{
            console.log('From the database', doc);
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: ' no valid entry found for provided ID'});
            }
            res.status(200).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});


// delete one documents
router.delete('/api/activities/:id', (req, res) => {
    const id = req.params.id;
    Activity.findOneAndDelete(id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
});



// delete all documents
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


router.put('/api/activities/:id', function (req, res, next) {
    var id = req.params.id;
    Activity.findById(id, function (err, activities){
        if (err) { return next(err); }
        if (activities == null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        activities.name = req.body.name;
        activities.activity_type = req.body.activity_type;
        activities.save();
        res.json(activities);
    });
});

router.patch('/api/activities/:id', function(req, res, next) {
    var id = req.params.id;
    Activity.findById(id, function (err, activities){
        if (err) { return next(err); }
        if (activities == null) {
            return res.status(404).json(
                {'message': 'Review not found'});
        }
        activities.name =(req.body.name || activities.name);
        activities.activity_type = (req.body.rating || activities.activity_type);


        activities.save();
        res.json(activities);
    });
});




module.exports = router;
