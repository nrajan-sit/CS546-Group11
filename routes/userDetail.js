const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.users;
const User = require("../data/users");

router.get("/", async (req, res) => {
  console.log("inside userdetail.js / ")
  console.log(req.session.user);
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = req.session.user
  res.render("user/userDetail", {userList: userList});
});


router.get("/userUpdate", async (req, res) => {
  console.log("inside userdetail.js / ")
  console.log(req.session.user);
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = req.session.user
  res.render("user/userUpdate", {userList: userList});
});


router.post("/userUpdate", async (req, res) => {
  try{
    console.log(req.body);
    const userData =   await User.updateUser(req.body.Email,req.body);
    res.render("user/userDetail");

  }catch(e){
    console.log(e);
    res.status(500).json({ title: "Home page: Signup",
            status: false,
            message: "Error Occured"+ e})
  }
});


module.exports = router;
