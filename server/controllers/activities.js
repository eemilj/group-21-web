const Activity = require('../models/Activity');


// create a new document
const addActivity = (req, res) =>{
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
};


// filter the groups by type, if it exists if not return all
const getActivity = (req, res, next) => {
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
};

const getActivityById = (req, res, next) => {
    var id = req.params.id;
    Activity.findById(id, function(err, activities) {
        if (err) { return next(err); }
        if (activities == null) {
            return res.status(404).json(
                {'message': 'User not found'}
            );
        }
        res.json(activities);
    });
};


const deleteActivityById = (req, res, next) => {
    var id = req.params.id;
    Activity.findOneAndDelete({ _id: id }, function(err, activity) {
        if (err) {
            return next(err);
        }
        if (activity === null) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json();
    });
};


// delete all documents
const deleteActivityAll = (req, res, next) => {
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
};

const updateActivityById = (req, res, next) => {
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
};



const patchActivityById = (req, res, next) => {
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
};



module.exports = {
    addActivity,
    getActivity,
    getActivityById,
    deleteActivityById,
    updateActivityById,
    patchActivityById,
    deleteActivityAll
};
