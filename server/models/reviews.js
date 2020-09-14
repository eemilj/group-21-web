var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose user schema
var reviewSchema = new Schema({
    author: {
        type: String,
        required: [true, "Author is required."],
    },

    reviewee: {
        type: String,
        required: [true, "Reviewee is required"]
    },

    rating: {
        type: Number,
        required: [true, "Rating is required."]
    },

    date: {
        type: Date
    },

    subject: {
        type: String,
        required: [true, "Subject is required"]
    }
});

module.exports = mongoose.model('reviews', reviewSchema);