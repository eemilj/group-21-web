var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    activity_type: {
        type: String,
        required: true,
        unique: true
    }
    /*,

    thumbnail:
    {
        data: Buffer,
        contentType: String
    }
*/
});

module.exports = mongoose.model('activity', activitySchema);
