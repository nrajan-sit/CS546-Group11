const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");
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


router.get("/", async (req, res) => {
  const currentMovies = await movieData.getCurrentPlayingMovies();
  res.render("home/home", { currentMovies: currentMovies});
});

// when the user searches for things
// router.post("/", async (req, res) => {

//       if (typeof movie.searchTerm != "string" || movie.searchTerm.trim().length == 0)
//         errors.push("Please enter a proper text to search the movies");

// });

module.exports = router;
