const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

router.get("/", async (req, res) => {
  console.log("inside movietheatre.js / ")
  const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  res.render("movietheatre/movietheatre", {movieTheatreList: movieTheatreList});
});

module.exports = router;
