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
  description: {
    type: String,
    required: true,
  },
  screenTime: {
    type: String,
    required: true,
  },
  // reviews: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Review",
  // },
});

module.exports = movieSchema;
