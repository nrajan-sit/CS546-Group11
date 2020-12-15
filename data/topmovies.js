const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;


// get topmovies from critics and users
async function getTopMovies(whoseRatings) {
  console.log("inside data/topmovies.js", whoseRatings);
  const movieCollection = await allMovies();

  if (
    !whoseRatings ||
    (typeof whoseRatings == "string" && whoseRatings.trim().length == 0) ||
    !["Critic_Ratings", "User_Ratings"].includes(whoseRatings)
  )
    throw "Please enter a valid rating column";

    let sortdesc;

    if(whoseRatings == 'Critic_Ratings')
        sortdesc = { Critic_Ratings: -1 }; // -1 for desc order

    if(whoseRatings == 'User_Ratings')
        sortdesc = { User_Ratings: -1 };

    const topMovieCollection = await movieCollection.find({}).sort(sortdesc).toArray();
//   const topMovieCollection = await movieCollection.find({}).toArray();

  console.log(topMovieCollection);
  if (!topMovieCollection) throw "Movie list not found..........";

  return topMovieCollection;
}

module.exports = {
  getTopMovies,
};