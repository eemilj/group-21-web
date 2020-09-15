var express = require('express');
var router = express.Router();

var GroupSchema = require('../models/groups');

router.post('/api/groups', function(req, res, next) {
    var group = new GroupSchema(req.body);

    group.save(function(err) {
        if (err) { return next(err); } // pass error to next middleware
        res.status(201).json(group);
    });
});

router.get('/api/groups', function(req, res, next) {
    GroupSchema.find(function (err, groups) {
        if (err) { return next(err); }
        res.json({"groups": groups});
    });
});

router.get('/api/groups/:id', function(req, res, next) {
    GroupSchema.findById(req.params.id, function(err, group) {
        if (err) { return next(err); }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found"}
            );
        }
        res.json(group);
    });
});

router.put('/api/groups/:id', function (req, res, next) {
    var id = req.params.id;
    GroupSchema.findById(id, function (err, group){
        if (err) { return next(err); }
        if (group == null) {
            return res.status(404).json({"message": "Group not found"});
        }
        group.name = req.body.name;
        group.location = req.body.location;
        group.activity = req.body.activity;
        group.startDate = req.body.startDate;
        group.endDate = req.body.endDate;
        group.save();
        res.json(group);
    });
});

router.patch('/api/groups/:id', function(req, res, next) {
    var id = req.params.id;
    GroupSchema.findById(id, function (err, group){
        if (err) { return next(err); }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found"});
        }
        group.name = (req.body.name || group.name);
        group.location = (req.body.location || group.location);
        group.activity = (req.body.activity || group.activity);
        group.startDate = (req.body.startDate || group.startDate);
        group.endDate = (req.body.endDate || group.endDate);
        group.save();
        res.json(group);
    });
});

router.delete('/api/groups/:id', function(req, res, next) {
    var id = req.params.id;
    GroupSchema.findOneAndDelete({_id: id}, function(err, group){
        if (err) { return next(err); }
        if (group == null) {
            return res.status(404).json(
                {"message": "Group not found"});
        }
        res.json(group);
    });
});

module.exports = router;