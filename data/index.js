const movieData = require("./movies");
const movieRating = require("./movierating");
const movieTheatreData = require("./movietheatres");
const movieTheatreRating = require("./movietheatrerating");
const showTimeData = require("./showtimes");
const userData = require("./users");
const searchData = require("./search");
const topMovieData = require("./topmovies");
const transactionData = require("./transaction");

module.exports = {
  movies: movieData,
  movietheatres: movieTheatreData,
  showtimes: showTimeData,
  users: userData,
  search: searchData,
  topmovies: topMovieData,
  movierating: movieRating,
  movietheatrerating: movieTheatreRating,
  transaction: transactionData,
};
