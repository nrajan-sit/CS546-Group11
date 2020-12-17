const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

router.get("/", async (req, res) => {
  console.log("inside movietheatre.js / ");
  const movieTheatreList = await movieTheatreData.getMovieTheatreList();

  const userList = req.session.user ;
  console.log("user inside theatre",userList)
  res.render("movietheatre/movietheatre", {
    movieTheatreList: movieTheatreList,
    userList: userList,
  });
});

module.exports = router;
