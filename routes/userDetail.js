const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.users;
const User = require("../data/users");

router.get("/", async (req, res) => {
  // console.log("inside userdetail.js / ")
  // console.log(req.session.user);
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = req.session.user
  res.render("user/userDetail", {userList: userList});
});


router.get("/userUpdate", async (req, res) => {
  // console.log("inside userdetail.js / ")
  // console.log(req.session.user);
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = req.session.user
  res.render("user/userUpdate", {userList: userList});
});


router.get("/getTrans", async (req, res) => {

  const userList = req.session.user ;

  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userTrans = await User.getTransaction(userList.User_Name);
  // console.log(userTrans);
  res.render("user/userTran", {userTrans: userTrans, userList: userList});
});


router.post("/userUpdate", async (req, res) => {
  try{
    // console.log(req.body);
    const userList =   await User.updateUser(req.body.Email,req.body);
    req.session.user = userList;
    res.render("user/userDetail" , {userList: userList});

  }catch(e){
    // console.log(e);
    res.status(500).json({ title: "Home page: Signup",
            status: false,
            message: "Error Occured"+ e})
  }
});


module.exports = router;
