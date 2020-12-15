const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");
const movieRating = require("../data/movierating");
const movieTheatreData = require("../data/movietheatres");

const path = require("path");
const { route } = require("./home");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

router.get("/", async (req, res) => {
  console.log("inside movie theater rating do nothing");
  // console.log(req.params.id);
  // const currentMovies = await movieData.getMovie(req.params.id);
  // console.log("And the movei is :- ", currentMovies);
  // res.render("movie/moviedetails", { currentMovies: currentMovies });
});

router.get("/:id", async (req, res) => {
  console.log("inside movie theatre details ......");

  let dayArray = [];
  let newDate = new Date();
  dayArray[0] =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate();
  dayArray[1] =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    (newDate.getDate() + 1);
  dayArray[2] =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    (newDate.getDate() + 2);

  const movieTheatreDetails = await movieTheatreData.getMovieTheatre(
    req.params.id
  );


  res.render("movietheatre/movietheatrerating", {
    movieTheatreDetails: movieTheatreDetails,
  });
  console.log("......inside movie details ......");
});

router.post("/addReview", async (req, res) => {
  console.log("inside add review ......");
  console.log(movieRating);
  // console.log(req.params.id);
  const movieDetails = await movieRating.addRating(req.body);
  const ratingDetails = await movieRating.getRatingByMovieId(req.body.movieId);
  console.log("ratingDetails", ratingDetails);
  // console.log("And the movei is :- ", movieDetails);
  res.render("movie/moviedetails", {
    movieDetails: movieDetails,
    ratingDetails: ratingDetails,
  });
  console.log("......inside add review ......");
});

module.exports = router;
