const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.users;

router.get('/:id', async (req, res) => {
  try {
    let show = await showData.getShowById(req.params.id);
    res.render('display/shows', { show: show, title: "Shows found" });
  } catch (e) {
    res.status(404).json({ error: 'show not found' });
  }
});

router.get("/", async (req, res) => {
  console.log("inside userdetail.js / ")
  console.log(req.session.user);
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = req.session.user
  res.render("user/userDetail", {userList: userList});
});

module.exports = router;
