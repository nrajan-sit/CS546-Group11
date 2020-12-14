const express = require("express");
const router = express.Router();
const searchData = require("../data/search");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

router.get("/:id", async (req, res) => {
    // console.log("inside search.js / ");

    const searchMovie = await searchData.getMovieList(req.params.id);
    // console.log("inside search.js 3/ ", req.params.id);

    // res.render("home/search", { searchMovie: searchMovie });
    res.json(searchMovie);
});

module.exports = router;
