var Group = require('../models/groups');
var Review = require('../models/reviews');

const createGroup = (req, res) => {
    const group = new Group(req.body);

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
            res.status(500).json({
                error: err
            });
        });
};

const getAllGroups = (req, res, next) => {
    Group.find(function (err, groups) {
        if (err) {
            return next(err);
        }
        res.json(groups);
    });
};

const  getGroupById = (req, res, next) => {
    Group.findById(req.params.id, function(err, group) {
        if (err) {
            return next(err);
        }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found."}
            );
        }
        res.json(group);
    });
};

const updateGroupById = (req, res, next) => {
    var id = req.params.id;
    Group.findById(id, function (err, group){
        if (err) { return next(err); }
        if (group == null) {
            return res.status(404).json({"message": "Group not found."});
        }
        group.name = req.body.name;
        group.location = req.body.location;
        group.activity = req.body.activity;
        group.startDate = req.body.startDate;
        group.endDate = req.body.endDate;
        group.thumbnail = req.body.thumbnail;
        group.regMembers = req.body.regMembers;
        group.save();
        res.json(group);
    });
};

const patchGroupById = (req, res, next) => {
    var id = req.params.id;
    Group.findById(id, function (err, group){
        if (err) {
            return next(err);
        }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found."});
        }
        group.name = (req.body.name || group.name);
        group.location = (req.body.location || group.location);
        group.activity = (req.body.activity || group.activity);
        group.startDate = (req.body.startDate || group.startDate);
        group.endDate = (req.body.endDate || group.endDate);
        group.thumbnail = (req.body.thumbnail || group.thumbnail);
        group.description = (req.body.description || group.description);
        group.regMembers = (req.body.regMembers || group.regMembers);
        group.save();
        res.json(group);
    });
};

const deleteGroupById = (req, res, next) => {
    var id = req.params.id;
    Group.findOneAndDelete({_id: id}, function(err, group){
        if (err) {
            return next(err);
        }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found."});
        }

        Review.deleteMany({ reviewee : groupId}, function(error, reviews) {
            if (error) {
                return next(error);
            }
            if (reviews == null) {
                return res.status(404).json(
                    {"message": "Review not found."});
            }
        });

        res.json(group);
    });
};

const deleteAllGroups = (req, res, next) => {
  Group.deleteMany(function(err, groups){
      if (err) {
          return next(err);
      }
      if (groups == null) {
          return res.status(404).json(
              {"message": "Groups not found."});
      }
      console.log('Successfully deleted all groups.');
      return res.status(200).json(groups);
  })

};



module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroupById,
    patchGroupById,
    deleteGroupById,
    deleteAllGroups
};