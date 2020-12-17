const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");
const movieRating = require("../data/movierating");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

router.get("/", async (req, res) => {
  console.log("inside movie details do nothing");
  // console.log(req.params.id);
  // const currentMovies = await movieData.getMovie(req.params.id);
  // console.log("And the movei is :- ", currentMovies);
  // res.render("movie/moviedetails", { currentMovies: currentMovies });
});

router.get("/:id", async (req, res) => {
  console.log("inside movie details ......");
  // console.log(req.params.id);
  const movieDetails = await movieData.getMovie(req.params.id);
  const ratingDetails = await movieRating.getRatingByMovieId(req.params.id);
  console.log("ratingDetails",ratingDetails)
  
  let ratings = ratingDetails.map((d) => {
    return parseInt(d.Rating);
  });

  const sum = ratings.reduce((a, b) => a + b, 0);
  var avg = sum / ratings.length || 'N/A';
  avg = !isNaN(avg) ? avg.toFixed(1) : avg;
  let reviews = ratingDetails.map((d) => {
    return d.review;
  });

  if (reviews.length === 0) {
    reviews.push("N/A")
  }
  console.log("ratings", ratings);
  console.log("avg", avg);
  console.log("reviews", reviews);
  // console.log("And the movei is :- ", movieDetails);
  const userList = req.session.user;
  console.log('userList',userList)
  res.render("movie/moviedetails", {
    movieDetails: movieDetails,
    ratingDetails: ratingDetails,
    avgRating: avg,
    userList: userList
  });
  console.log("......inside movie details ......");
});

module.exports = router;
