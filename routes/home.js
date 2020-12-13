const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");
const movieTheatreData = require("../data/movietheatres");

// const movieData = data.movies;
// const bcrypt = require("bcrypt");
// const saltRounds = 16;
// const userlogincollection = require("../users");
const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());


// const userData = data.users;

// let currentUser = [];

// Show current movies poster
// Show movie theatre with today's showtimes
router.get("/", async (req, res) => {
  const currentMovies = await movieData.getCurrentPlayingMovies();
  const movieTheatreDetails = await movieTheatreData.getMovieTheatreList();
  const movieTheatreShowtimeDetails1 = await movieData.getMovieTheatreShowtimeMovies();

  let dayArray = []
  let day1 = new Date();
  dayArray[0] = day1.toISOString().slice(0, 10);

  let finalMovieList1 = [];

  // console.log(movieTheatreShowtimeDetails1);
  // // prep the showtimelists
  // for(i=0;i<movieTheatreShowtimeDetails1.length;i++)
  //   if(movieTheatreShowtimeDetails1[i].MovieDetails.length != 0)
  //     finalMovieList1.push(movieTheatreShowtimeDetails1[i]);


  // // split the showtimes for the dates
  // let k = 0;
  // while(k < finalMovieList1.length){

  //   if (finalMovieList1[k].Date != dayArray[0] || finalMovieList1[k].MovieDetails.length == 0) {
  //     finalMovieList1.splice(k, 1);
  //       k = 0;
  //     }
  //   else
  //     k = k + 1;
  // }

  // console.log("what do we have here")
  // console.log(finalMovieList1);




  res.render("home/home", {
    currentMovies: currentMovies,
    curretShowtimes: movieTheatreShowtimeDetails1,
  });
});

// when the user searches for things
// router.post("/", async (req, res) => {

//       if (typeof movie.searchTerm != "string" || movie.searchTerm.trim().length == 0)
//         errors.push("Please enter a proper text to search the movies");

// });

module.exports = router;
