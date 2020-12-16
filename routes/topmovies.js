const express = require("express");
const router = express.Router();
const topMovieData = require("../data/topmovies");

router.get("/:id/:id2", async (req, res) => {

  // console.log("inside topmovies.js / ", req.params);
  // console.log("default parameter : ", req.params.id);
  // console.log("default parameter : ", req.params.id2);

  const topMovies = await topMovieData.getTopMovies(req.params.id, req.params.id2);

  res.render("movie/topmovies", {
    topMovies: topMovies,
    customRating: req.params.id
  });
});

module.exports = router;
