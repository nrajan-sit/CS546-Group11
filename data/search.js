const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;

// Search for movie
async function getMovieList(movieName) {
    console.log("GetMovieList:",movieName)
  const movieCollection = await allMovies();

  if (!movieName || (typeof movieName == "string" && movieName.trim().length == 0))
    throw "Please enter a valid movie name";

    // schemaName.index({ request: 'text' });
  const movieDeets = await movieCollection.find({ Movie_Name: new RegExp(movieName, 'i') }).toArray();

  console.log("result in getMovieList:", movieDeets);
  if (!movieDeets) throw "Movie not found..........";

  return movieDeets;
}

module.exports = {
  getMovieList,
};