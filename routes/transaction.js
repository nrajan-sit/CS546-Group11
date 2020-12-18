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

router.post("/", async (req,res)=>{
    try{
      // console.log(req.body);
      const userData =   await transactionData.createTransaction(req.body, req.session.user);
      res.redirect("/");

    }catch(e){
      // console.log(e);
      res.status(500).json({ title: "Checkout : Checking out ticket",
              status: false,
              message: "Error Occured"+ e})
    }
})





module.exports = router;
