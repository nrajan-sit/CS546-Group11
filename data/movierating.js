const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;
const allShowtimes = mongoCollections.showtime;
const allMovieTheatres = mongoCollections.movieTheatres;
const movieRatings = mongoCollections.movieRatings;
const movieTheatreData = require("./movietheatres");

async function addRating(data) {
  const ratingCollection = await movieRatings();
  const moviesCollection = await allMovies();
  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let movieId = ObjectId(data.Movie_id);
  let userId;
  if (!data.User_id) 
    userId = ObjectId("5fd7a040f7626f2db0517ebb");
  else
    userId = data.User_id;

  let ratingData = {
    Rating: data.Rating,
    Review: data.Review,
    Movie_id: movieId,
    User_id: userId
  };

  let insertedRating = await ratingCollection.insertOne(ratingData);

  if (insertedRating.insertedCount === 0) throw "Movie was not created";

  let ratingId = insertedRating.insertedId.toString();

  const ratingDetails = await getRatingById(ratingId);

  console.log(ratingDetails);

  
  // Need to push the ratingDetails._id into the Movie Theatre table's "User_Reviews" array column
  let movieRating = await moviesCollection.updateOne(
    { _id: movieId },
    { $push: { User_Reviews: insertedRating.insertedId } }
  );

  // console.log(movieRating);

  return ratingDetails;
}
// get single movie rating based on ID
async function getRatingById(ratingId) {
  console.log("iansdasdasnd ")
  console.log(!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
  // return
  const ratingCollection = await movieRatings();

  if (!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
    throw "Please enter a valid movie name 1";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newMovieId = ObjectId(ratingId);

  const movieID = await ratingCollection.findOne({ _id: newMovieId }); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

async function getRatingByMovieId(movieId) {
  const ratingCollection = await movieRatings();
  console.log("movieId",movieId)
  console.log("typeof movieId",typeof movieId)
  if (!movieId || (typeof movieId !== "string" && movieId.trim().length == 0))
    throw "Please enter a valid movie name 2";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newMovieId = ObjectId(movieId);

  const movieID = await ratingCollection.find({ Movie_id: newMovieId }).toArray(); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

module.exports = {
  addRating,
  getRatingById,
  getRatingByMovieId,
};
