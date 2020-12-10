const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;

// get single movie based on ID
async function getMovie(movie) {
  const movieCollection = await allMovies();

  if (!movie || (typeof movie == "string" && movie.trim().length == 0))
    throw "Please enter a valid movie name";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newMovieId = ObjectId(movie);

  const movieID = await movieCollection.findOne({ _id: newMovieId }); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

// get single movie based on name  // need to test this 
async function getMovieName(movieName) {
  const movieCollection = await allMovies();

  if (!movieName || (typeof movieName == "string" && movieName.trim().length == 0))
    throw "Please enter a valid movie name";

  const movieID = await movieCollection.findOne({ Movie_Name: movieName }); //findOne({ Movie_Name: movie });

  if (!movieID) throw "Movie not found..........";
  return movieID;
}

// Currently playing movies
async function getCurrentPlayingMovies() {
  const movieCollection = await allMovies();
  const movieArray = await movieCollection.find({}).toArray();

  let currentMovies = [];
  let today = new Date().toISOString().slice(0, 10); // convert to YYYY-MM-DD format

  for (i = 0; i < movieArray.length; i++) {
    if (movieArray[i].Release_Date < today)
      currentMovies.push(movieArray[i]);
  }

  // console.log(currentMovies);
  return currentMovies;
}

// coming soon movies
async function getComingSoonMovies() {
  const movieCollection = await allMovies();
  const movieArray = await movieCollection.find({}).toArray();

  let currentMovies = [];
  let today = new Date().toISOString().slice(0, 10); // convert to YYYY-MM-DD format

  for (i = 0; i < movieArray.length; i++) {
    if (movieArray[i].Release_Date > today)
      currentMovies.push(movieArray[i]);
  }

  // console.log(currentMovies);
  return currentMovies;
}

module.exports = {
  getMovie,
  getCurrentPlayingMovies,
  getComingSoonMovies,
};
