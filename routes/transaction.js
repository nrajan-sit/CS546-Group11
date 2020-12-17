const express = require("express");
const router = express.Router();
const transactionData = require("../data/transaction");
const movieTheatreData = require("../data/movietheatres");
const movieData = require("../data/movies");


const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

// Fill the transaction page
router.get("/", async (req, res) => {

  const userList = req.session.user ;
  
  const movieTheatreShowtimeDetails1 = await movieData.getMovieTheatreShowtimeMovies();

  res.render("transaction/transaction", {
    movieTheatreShowtimeDetails1: movieTheatreShowtimeDetails1,
    userList: userList,
  });
});

// Insert into transaction DB
router.post("/:id", async (req, res) => {
  console.log("inside transaction.js post / ");

  console.log(req.body);

//   const searchMovie = await transactionData.getTransaction(req.params.id);
  // console.log("inside search.js 3/ ", req.params.id);

  // res.render("home/search", { searchMovie: searchMovie });
});

module.exports = router;
