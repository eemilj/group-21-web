var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportsSschema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('activity/types', sportsSschema);
