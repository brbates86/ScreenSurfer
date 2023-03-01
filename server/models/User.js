const {Schema, modal} = require('mongoose');
const bcrypt = require('bcrypt');
const movieSchema = require('./movies');

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique: true, 
        trim: true,
    },
    email: {
       type: String,
       requiered: true,
       unique: true,
       match: [/.+@.+\..+/]
    },

    password: {
        type: String,
        required: true,
        match:[A-Za-z],
        minlength: 5,
    },
    savedMovies:[movieSchema]
})

userSchema.pre('save', async function (next) {
     if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (passowrd) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
