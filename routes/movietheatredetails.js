const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");
const movieTheatreRating = require("../data/movietheatrerating");

const path = require("path");
const { movieTheatres } = require("../config/mongoCollections");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

// router.get("/", async (req, res) => {
//   console.log("inside movie theatre details do nothing");
//   // console.log(req.params.id);
//   // const currentMovies = await movieData.getMovie(req.params.id);
//   // console.log("And the movei is :- ", currentMovies);
//   // res.render("movie/moviedetails", { currentMovies: currentMovies });
// });

router.get("/:id", async (req, res) => {
  console.log("inside movie theatre details ......");
  // console.log(req.params.id);

  // Get the dates for the Tabs
  // let dayArray = [];
  // let day1 = new Date();
  // console.log(day1);
  // console.log(day1.toLocaleString());
  // console.log(day1);
  // dayArray[0] = day1.toISOString().slice(0, 10);

  // day1.setDate(day1.getDate() + 1);
  // dayArray[1] = day1.toISOString().slice(0, 10);

  // day1.setDate(day1.getDate() + 1);
  // dayArray[2] = day1.toISOString().slice(0, 10);

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

  const finalMovieList1 = await movieTheatreData.createMovieTheatreWithShowTimes(
    req.params.id,
    dayArray[0]
  );
  const finalMovieList2 = await movieTheatreData.createMovieTheatreWithShowTimes(
    req.params.id,
    dayArray[1]
  );
  const finalMovieList3 = await movieTheatreData.createMovieTheatreWithShowTimes(
    req.params.id,
    dayArray[2]
  );

  const ratingDetails = await movieTheatreRating.getRatingByTheatreId(req.params.id);
  console.log("ratingDetails",ratingDetails)
  // let ratings = ratingDetails.map((d) => {
  //   return parseInt(d.Rating);
  // });

  // let ratings = ratingDetails.Rating;
  
  // const sum = ratings.reduce((a, b) => a + b, 0);
  // var avg = sum / ratings.length || "N/A";
  // avg = !isNaN(avg) ? avg.toFixed(1) : avg;

  // let reviews = ratingDetails.map((d) => {
  //   return d.review;
  // });

  // if (reviews.length === 0) {
  //   reviews.push("N/A");
  // }

  // console.log("ratings", ratings);
  // console.log("avg", avg);
  // console.log("reviews", reviews);

  res.render("movietheatre/movietheatredetails", {
    movieTheatreDetails: movieTheatreDetails,
    movieTheatreShowtimeDetails1: finalMovieList1,
    movieTheatreShowtimeDetails2: finalMovieList2,
    movieTheatreShowtimeDetails3: finalMovieList3,
    timeTab: dayArray,
    // ratingDetails: {
    //   avgRating: avg,
    //   reviews: reviews
    // },
  });
  console.log("......inside movie details ......");
});

module.exports = router;
