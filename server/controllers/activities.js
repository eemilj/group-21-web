const Activity = require('../models/Activity');
//var Users = require('../models/users');


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


const getActivityById = (req, res)=>{
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
};



const deleteActivityById = (req, res) => {
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
    patchActivityById
};
