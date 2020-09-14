var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose user schema
var userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required.']
    },

    admin: {
        type: Boolean
    },

    registrationDate: {
        type: Date
    }
});

module.exports = mongoose.model('users', userSchema);
