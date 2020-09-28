var User = require('../models/users');


const createUser = (req, res) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: (req.body.admin || false),
        registrationDate: Date.now()
    });
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling post request to users.',
                createdUser : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

const authenticateUser = (req, res) => {
    var username = req.body.username;
    var reqPassword = req.body.password;

    User.findOne({ username: username}, (err, user) => {
        if (user === null ) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (reqPassword === user.password) {
            res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                    admin: user.admin,
                    registrationDate: user.registrationDate
                }
            });
        } else {
            res.status(401).json({ message: 'Wrong credentials. Try again.'});
        }
    }).catch(error => {
        res.status(500).json({ error: error});
    });
};

const getAllUsers = (req, res, next) => {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(
            {"users": users}
        );
    });
}

const getUserById = (req, res, next) => {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user == null) {
            return res.status(404).json(
                {message: "User not found."}
            );
        }
        res.json(user);
    });
};

const updateUserById = (req, res, next) => {
    var id = req.params.id;
    User.findById(id, function (err, user){
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found."});
        }
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.save();
        res.json(user);
    });
};

const patchUserById = (req, res, next) => {
    var id = req.params.id;
    User.findById(id, function (err, user){
        if (err) {
            return next(err);
        }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found."});
        }
        user.username = (req.body.username || user.username);
        user.password = (req.body.password || user.password);

        // In case the admin permissions weren't changed by the patch request the following
        // if statement surpasses the validation error occurring due to the undefined value
        if (req.body.admin !== undefined){
            user.admin = (String(req.body.admin) || user.admin);
        }
        user.save();
        res.json(user);
    });
};

const deleteUserById = (req, res, next) => {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user){
        if (err) {
            return next(err);
        }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found."});
        }
        res.json(user);
    });
};

const deleteAllUsers = (req, res, next) => {
    User.deleteMany(function(err, users){
        if (err) {
            return next(err);
        }
        if (users == null) {
            return res.status(404).json(
                {"message": "Users not found."});
        }
        console.log('Successfully deleted all users.');
        return res.status(200).json(users);
    })

};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    patchUserById,
    deleteUserById,
    deleteAllUsers,
    authenticateUser
};