var express = require('express');
var router = express.Router();

var UserSchema = require('../models/users');

router.post('/api/users', function(req, res, next) {
    var user = new UserSchema(req.body);

    user.registration_date = Date.now();
    user.admin = (req.body.admin || false);
    user.save(function(err) {
        if (err) { return next(err); } // pass error to next middleware
        res.status(201).json(user);
    });
});

router.get('/api/users', function(req, res, next) {
    UserSchema.find(function (err, users) {
        if (err) { return next(err); }
        res.json({'users': users});
    });
});

router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    UserSchema.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'}
            );
        }
        res.json(user);
    });
});

router.put('/api/users/:id', function (req, res, next) {
    var id = req.params.id;
    UserSchema.findById(id, function (err, user){
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.username = req.body.username;
        user.password = req.body.password;
        // TODO: Validation in order to only allow admins to change user's permissions
        user.admin = req.body.admin;
        user.save();
        res.json(user);
    });
});

router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    UserSchema.findById(id, function (err, user){
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        }
        user.username = (req.body.username || user.username);
        user.password = (req.body.password || user.password);
        // TODO: Validation in order to only allow admins to change user's permissions
        if(req.body.admin != undefined){
            user.admin = (String(req.body.admin) || user.admin);
        }
        user.save();

        res.json(user);

    });
});

router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    UserSchema.findOneAndDelete({_id: id}, function(err, user){
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        }
        res.json(user);
    });
});

module.exports = router;
