const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;
const allShowtimes = mongoCollections.showtime;
const allMovieTheatres = mongoCollections.movieTheatres;
const movieRatings = mongoCollections.movieRatings;
const movieTheatreData = require("./movietheatres");

async function addRating(data) {
  const ratingCollection = await movieRatings();
  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let movieId = ObjectId(data.movieId);
  let userId = ObjectId('5fd7a040f7626f2db0517ebb');
  let ratingData = {
    rating: data.rating,
    review: data.review,
    movieId: movieId,
    userId: userId
  };

  let insertedRating = await ratingCollection.insertOne(ratingData);

  if (insertedRating.insertedCount === 0) throw "Movie was not created";

  let ratingId = insertedRating.insertedId.toString();

  const ratingDetails = await getRatingById(ratingId);

  console.log(ratingDetails);

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
  if (!movieId || (typeof movieId !== "string" && movieId.trim().length == 0))
    throw "Please enter a valid movie name 2";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newMovieId = ObjectId(movieId);

  const movieID = await ratingCollection.find({ movieId: newMovieId }).toArray(); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

module.exports = {
  addRating,
  getRatingById,
  getRatingByMovieId,
};
