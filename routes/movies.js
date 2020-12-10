const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));


router.get("/", async (req, res) => {
  const currentMovies = await movieData.getCurrentPlayingMovies();
  const futureMovies = await movieData.getComingSoonMovies();

  res.render("movie/movie", { currentMovies: currentMovies, futureMovies:futureMovies });
});


module.exports = router;
