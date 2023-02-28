const {Schema, modal} = require('mongoose');
const bcrypt = require('bcrypt');

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
       match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true,
        match:[A-Za-z],
        minlength: 5,
    },
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