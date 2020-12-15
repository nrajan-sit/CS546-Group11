const express = require("express");
const router = express.Router();
const topMovieData = require("../data/topmovies");

router.get("/:id", async (req, res) => {

  console.log("inside topmovies.js / ");
  console.log("default parameter : ", req.params.id);

  const topMovies = await topMovieData.getTopMovies(req.params.id);
//   const topCriticMovies = await topMovieData.getTopMovies("Critic_Ratings");


  res.render("movie/topmovies", {
    topMovies: topMovies,
    customRating: req.params.id
  });
});

module.exports = router;
