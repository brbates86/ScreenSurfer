const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const movieSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        release:{
            type: Date
        },
        description: {
            type: String,
            required: true,
            
        },
        screenTime:{
            type: String,
            required:true

            
        },
        reviews: {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    }
);
const Movies = model('movieSchema', movieSchema)
module.exports = Movies;
