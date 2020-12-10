
const homeRoutes = require("./home");
const moviesRoutes = require("./movies");
const movieDetailsRoutes = require("./moviedetails");

// const privateRoutes = require('./private');
// const logoutRoutes = require('./logout');

const express = require("express");
const app = express();
app.use("/public", express.static(__dirname + "/public"));



const constructorMethod = (app) => {
  app.use("/", homeRoutes);
  app.use("/movies", moviesRoutes);
  app.use("/moviedetails", movieDetailsRoutes);
  // app.use("/movies/moviedetails/:id", moviesRoutes);
  // app.use('/private', privateRoutes);
  // app.use('/logout', logoutRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
