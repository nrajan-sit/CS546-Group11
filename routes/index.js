const homeRoutes = require("./home");
const moviesRoutes = require("./movies");
const movieDetailsRoutes = require("./moviedetails");
const movieRatingRoutes = require("./movierating");
const movieTheatreRatingRoutes = require("./movietheatrerating");
const movieTheatresRoutes = require("./movietheatres");
const movieTheatreDetailsRoutes = require("./movietheatredetails");
const searchRoutes = require("./search");
const topMoviesRoutes = require("./topmovies");
const userRoutes = require("./user");
const userDetailRoutes = require("./userDetail");
const transactionRoutes = require("./transaction");

// const privateRoutes = require('./private');
// const logoutRoutes = require('./logout');

const express = require("express");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

const constructorMethod = (app) => {
  app.use("/", homeRoutes);
  app.use("/movies", moviesRoutes);
  app.use("/moviedetails", movieDetailsRoutes);
  app.use("/movierating", movieRatingRoutes);
  app.use("/movietheatrerating", movieTheatreRatingRoutes);
  app.use("/movietheatres", movieTheatresRoutes);
  app.use("/movietheatredetails", movieTheatreDetailsRoutes);
  app.use("/search", searchRoutes);
  app.use("/topmovies", topMoviesRoutes);
  app.use("/user" , userRoutes);
  app.use("/userDetail" , userDetailRoutes);
  app.use("/transaction", transactionRoutes);

  // app.use("/movies/moviedetails/:id", moviesRoutes);
  // app.use('/private', privateRoutes);
  // app.use('/logout', logoutRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
