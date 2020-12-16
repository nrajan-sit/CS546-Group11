const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;


// get topmovies from critics and users
async function getTopMovies(whoseRatings, topX) {
  // console.log("inside data/topmovies.js", whoseRatings);
  const movieCollection = await allMovies();

  if (
    !whoseRatings ||
    (typeof whoseRatings == "string" && whoseRatings.trim().length == 0) ||
    !["Critic_Ratings", "User_Ratings"].includes(whoseRatings)
  )
    throw "Please enter a valid rating column";

  if (
    !topX ||
    (topX.trim().length == 0) ||
    ![10, 50].includes(parseInt(topX))
  )
    throw "Invalid top list number"

    let sortdesc;

    if(whoseRatings == 'Critic_Ratings')
        sortdesc = { Critic_Ratings: -1 }; // -1 for desc order

    if(whoseRatings == 'User_Ratings')
        sortdesc = { User_Ratings: -1 };

    const topMovieCollection = await movieCollection.find({}).sort(sortdesc).limit(parseInt(topX)).toArray();

  if (!topMovieCollection) throw "Movie list not found..........";

  return topMovieCollection;
}

module.exports = {
  getTopMovies,
};