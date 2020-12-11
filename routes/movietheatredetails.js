const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");

const path = require("path");
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
  const movieTheatreDetails = await movieTheatreData.getMovieTheatre(req.params.id);
    const movieTheatreShowtimeDetails = await movieTheatreData.getCurrentPlayingMoviesforMovieTheatre(req.params.id);

  console.log("And the movei is :- ", movieTheatreDetails);
  res.render("movietheatre/movietheatredetails", { movieTheatreDetails: movieTheatreDetails,movieTheatreShowtimeDetails:movieTheatreShowtimeDetails });
  console.log("......inside movie details ......");
});

module.exports = router;
