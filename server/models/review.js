const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    reivewText: {
        type: String,
        required: true,
        minlength: 4,
        maxlength:280,
        trim: true
    },
    reviewAuthor: {
        type: String,
        required: true,
        trim: true
    }
})

const Review = model('Review', reviewSchema)
module.exports = Review