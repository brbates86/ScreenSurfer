const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  release: {
    type: String,
  },
  poster: {
    type: String,
  },
  movieId: {
    type: String,
  },
});

module.exports = movieSchema;
