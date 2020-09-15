var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose group schema
var groupSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        type: String,
        required: true
    },

    activity: {
        type: String,
        required: true
    },

    //regMembers: { type: [Number], required: true },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    }

    // thumbnail


});

module.exports = mongoose.model('groups', groupSchema);