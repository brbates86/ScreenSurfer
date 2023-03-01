const {Schema, model} = require('mongoose');
const bcrypt = require('bycrypt');

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

        }
    }
)
module.exports = movieSchema;
