const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;
const allShowtimes = mongoCollections.showtime;
const allMovieTheatres = mongoCollections.movieTheatres;
const movieTheatreData = require("../data/movietheatres");


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


async function getMovieTheatreShowtimeMovies() {

  const showtimeCollection = await allShowtimes();
  const movieCollection = await allMovies();
  const movieTheatreCollection = await allMovieTheatres();

  const movieTheatreDetails = await movieTheatreData.getMovieTheatreList();

  // Get the showtimes for the movietheatre along with the movie details
    const theatreArray = await showtimeCollection
      .aggregate([
        {
          $lookup: {
            from: "Movies",
            localField: "Movie_id",
            foreignField: "_id",
            as: "MovieDetails",
          }
        },
        {
          $lookup: {
            from: "MovieTheatres",
            localField: "Movie_Theatre_id",
            foreignField: "_id",
            as: "MovieTheatreDetails",
          },
        },
        // this will be the output
        {
          $project: {
            Date: 1,
            Time: 1,
            Movie_id: 1,
            Movie_Theatre_id: 1,
            Movie_Name: "$MovieDetails.Movie_Name",
            Movie_Theatre_Name: "$MovieTheatreDetails.Movie_Theatre_Name",
          },
        },
        // { $match: { Movie_Theatre_id: newMovieTheatreId } },
      ])
      .toArray();

    let newShowTimeList = [];
    console.log(movieTheatreDetails);
    for(i=0;i<theatreArray.length;i++)

  return theatreArray;
}

// current showtimes
// async function getCurrentShowtimesatTheatre() {
//   const movieCollection = await allMovies();
//   const movieArray = await movieCollection.find({}).toArray();

//   // Get date and time : this works!
//   var today = new Date();
//   var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   var dateTime = date + " " + time;

//   console.log(dateTime);


//   // let currentMovies = [];
//   // let today = new Date().toISOString().slice(0, 10); // convert to YYYY-MM-DD format

//   // for (i = 0; i < movieArray.length; i++) {
//   //   if (movieArray[i].Release_Date > today)
//   //     currentMovies.push(movieArray[i]);
//   // }

//   // console.log(currentMovies);
//   return 1;
// }








/*****************************************************************************************

                                Creating the DB for Movies + Showtimes

/*****************************************************************************************/










module.exports = {
  getMovie,
  getCurrentPlayingMovies,
  getComingSoonMovies,
  getMovieTheatreShowtimeMovies,
  // getCurrentShowtimesatTheatre,
};
