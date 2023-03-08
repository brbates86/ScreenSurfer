const { Schema, model } = require("mongoose");
const movieSchema = require("./movies");

const watchlistSchema = new Schema({
  movies: [movieSchema],
});

module.exports = watchlistSchema;
