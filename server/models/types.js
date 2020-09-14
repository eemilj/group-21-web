var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportsSschema = new Schema({
    name: {

        unique: true
    }
});

module.exports = mongoose.model('activity/types', sportsSschema);
