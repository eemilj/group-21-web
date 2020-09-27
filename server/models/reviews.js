var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose user schema
var reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:'user',
        //required: [true, "Author is required."],
    },
    reviewee: {
        type: Schema.Types.ObjectId,
        ref:'group',
        //required: [true, "Reviewee is required"]
    },

    rating: {
        type: Number,
        //required: [true, "Rating is required."]
    },

    date: {
        type: Date
    },
    content: {
        type: String
    },
    subject: {
        type: String,
        //required: [true, "Subject is required"]
    }
});

module.exports = mongoose.model('reviews', reviewSchema);