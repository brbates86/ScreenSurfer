const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const movieSchema = require("./movies");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    requiered: true,
    unique: true,
    match: [/.+@.+\..+/],
  },

  password: {
    type: String,
    required: true,
  },
  savedMovies: [movieSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("movieCount").get(function () {
  return this.savedMovies.length;
});

const User = model("User", userSchema);

module.exports = User;
