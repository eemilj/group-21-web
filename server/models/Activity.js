const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    activity_type: {
        type: String,
        required: true
    }
    /*,

    thumbnail:
    {
        data: Buffer,
        contentType: String
    }
*/
});

module.exports = mongoose.model('Activity', activitySchema);
