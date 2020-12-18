const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;
const allShowtimes = mongoCollections.showtime;
const allMovieTheatres = mongoCollections.movieTheatres;
const movieRatings = mongoCollections.movieRatings;
const movieTheatreData = require("./movietheatres");
const movieData = require("../data/movies");

// Re-evaluate the movie rating when a user adds a rating for a movie
async function updateAvgMovieUserRating(movieID){
  // console.log("inside updateAvgMovieUserRating");

  const moviesCollection = await allMovies();
  const movieRatingCollection = await movieRatings();

  let movieDetails = await movieData.getMovie(movieID);
  let allRatingsforSingleMovie = await getRatingByMovieId(movieID);

  if (!movieDetails) throw "The movie doesn't Exist";
  else {
    let totalRating = 0;
    for (j = 0; j < allRatingsforSingleMovie.length; j++) {
      totalRating = totalRating + allRatingsforSingleMovie[j].Rating;
    }

    let avgRating = totalRating / allRatingsforSingleMovie.length;

    //We need to require ObjectId from mongo
    let { ObjectId } = require("mongodb");

    let newMovieId = ObjectId(movieID);

    let movieRating = await moviesCollection.updateOne(
      { _id: newMovieId },
      { $set: { User_Ratings: avgRating } }
    );
  }

}

async function addRating(data) {
  const ratingCollection = await movieRatings();
  const moviesCollection = await allMovies();

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let movieId = ObjectId(data.Movie_id);
  let userId = data.User_id;

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

  
  // Need to push the ratingDetails._id into the Movie Theatre table's "User_Reviews" array column
  let movieRating = await moviesCollection.updateOne(
    { _id: movieId },
    { $push: { User_Reviews: insertedRating.insertedId } }
  );

  // Update the avg user rating on the movie table since we inserted a new one
  let updateMovieUserRating = await updateAvgMovieUserRating(data.Movie_id);


  return ratingDetails;
}
// get single movie rating based on ID
async function getRatingById(ratingId) {

  // console.log(!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
  // return
  const ratingCollection = await movieRatings();

  if (!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
    throw "Please enter a valid movie name 1";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let newMovieId = ObjectId(ratingId);

  const movieID = await ratingCollection.findOne({ _id: newMovieId }); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

async function getRatingByMovieId(movieId) {
  const ratingCollection = await movieRatings();
  // console.log("movieId",movieId)
  // console.log("typeof movieId",typeof movieId)
  if (!movieId || (typeof movieId !== "string" && movieId.trim().length == 0))
    throw "Please enter a valid movie name 2";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

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
