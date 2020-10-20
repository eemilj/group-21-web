const Activity = require('../models/Activity');
const Group = require('../models/groups');
const Review = require('../models/reviews');

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
                {'message': 'Activity not found'}
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
            return res.status(404).json({ message: 'Activity not found' });
        }

        Group.find({ activity : id}, function(error, groups) {
            if (error) {
                return next(error);
            }
            if (groups == null) {
                return res.status(404).json(
                    {"message": "Groups not found."});
            }
            groups.forEach(function(group) {
                let groupId = group._id
                Review.deleteMany({ reviewee : groupId}, function(error, reviews) {
                    if (error) {
                        return next(error);
                    }
                    if (reviews == null) {
                        return res.status(404).json(
                            {"message": "Review not found."});
                    }
                });
            });

            Group.deleteMany({ activity : id}, function(err, group) {
                if (err) {
                    return next(err);
                }
                if (group == null) {
                    return res.status(404).json(
                        {"message": "Group not found."});
                }
            });

        });

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
        activities.activity_type = (req.body.activity_type || activities.activity_type);


        activities.save();
        res.json(activities);
    });
};

const getActivityWithGroupId = (req, res) => {
    var groupId = req.params.groupId;

    Group.findById(groupId, function (err, group){
        if(group === null){
            return res.status(404).json({"message": "No group found"});
        }
        if(err){
            return res.status(500).json({"message": "Invalid operation"})
        }
        res.json(group);
    });
};

const createActivityGroup = (req, res) => {
    const activityId = req.params.id;

    Activity.findById(activityId, function (err, activity){
        if(activity == null){
            return res.status(404).json({"message": "Activity not found"});
        }
        var group = new Group(req.body);
        group.activity = activityId;
        group.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling post request to groups.',
                    createdGroup: result
                });
            })
            .catch(err => {
                console.log(err);
                if (err.code === 11000 || err.code === 11001) {
                    res.status(409).json({
                        message: 'This group already exists.'
                    })
                } else {
                    res.status(500).json({
                        error: err
                    });
                }
            });
    });

};

const deleteActivityGroupWithId = (req, res) => {
    const groupId = req.params.groupId;

    Group.findOneAndDelete({ _id: groupId }, function (err, group){
        if(group === null){
            return res.status(404).json({"message": "No group found"});
        }
        if(err){
            return res.status(500).json({"message": "Invalid operation"})
        }
        res.json(group);
    });
};

const getGroupsWithActivityId = (req, res) => {
    const id = req.params.id;

    Group.find({ activity: { $eq: id } }, function (err, group){
        if(group === null){
            return res.status(404).json({"message": "No group found"});
        }
        if(err){
            return res.status(500).json({"message": "Invalid operation"})
        }
        res.json(group);
        });
};



module.exports = {
    addActivity,
    getActivity,
    getActivityById,
    deleteActivityById,
    updateActivityById,
    patchActivityById,
    deleteActivityAll,
    getActivityWithGroupId,
    createActivityGroup,
    deleteActivityGroupWithId,
    getGroupsWithActivityId
};
