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
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },

    regMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'UserID'
        }
    ]
    ,

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    thumbnail: {
        type: Buffer,
        contentType: String
    }


});

module.exports = mongoose.model('groups', groupSchema);