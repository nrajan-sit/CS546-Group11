const express = require("express");
const router = express.Router();
const movieData = require("../data/movies");

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
    console.log("inside movie details ......")
    // console.log(req.params.id);
    const movieDetails = await movieData.getMovie(req.params.id);
    // console.log("And the movei is :- ", movieDetails);
    res.render("movie/moviedetails", { movieDetails: movieDetails });
    console.log("......inside movie details ......");
    
});

module.exports = router;
