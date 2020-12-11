const mongoCollections = require("../config/mongoCollections");
const { showtime } = require("../config/mongoCollections");
const allMoviesTheatres = mongoCollections.movieTheatres;
const allShowtimes = mongoCollections.showtime;

// get single movie based on ID
async function getMovieTheatre(movieTheatre) {
  const movieCollection = await allMoviesTheatres();

  if (!movieTheatre || (typeof movieTheatre == "string" && movieTheatre.trim().length == 0))
    throw "Please enter a valid movie theatre name";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newMovieTheatreId = ObjectId(movieTheatre);

  const movieTheatreID = await movieCollection.findOne({ _id: newMovieTheatreId }); //findOne({ Movie_Name: movie });
    console.log(movieTheatreID);
  if (!movieTheatreID) throw "Movie Theatre not found..........";
  return movieTheatreID;
}


// Currently playing movies
async function getMovieTheatreList() {
  const movieCollection = await allMoviesTheatres();
  const showtimeCollection = await allShowtimes();
  const movieArray = await movieCollection.find({}).toArray();


  return movieArray;
}

// Currently playing movies
async function getCurrentPlayingMoviesforMovieTheatre(movieTheatreID) {
    const theatreID = getMovieTheatre(movieTheatreID);

  const movieCollection = await allMoviesTheatres();
  const showtimeCollection = await allShowtimes();
//   const movieArray = await movieCollection.find({}).toArray();
    const movieArray = await theatreID.aggregate([
      {
        $lookup: {
          from: showtimeCollection,
          localField: "_id",
          foreignField: "Movie_Theatre_id",
          as: "orderdetails",
        },
      },
    ]);
//   let currentMovies = [];
//   let today = new Date().toISOString().slice(0, 10); // convert to YYYY-MM-DD format


//   const movieTheatreArray = await movieTheatreCollection.aggregate([
//                             {"$match" : {}}

//   ])



//   for (i = 0; i < movieTheatreArray.length; i++) {
//     if (movieTheatreArray[i].Release_Date < today) currentMovies.push(movieArray[i]);
//   }

  // console.log(currentMovies);
  return movieArray;
}

module.exports = {
  getMovieTheatre,
  getMovieTheatreList,
  getCurrentPlayingMoviesforMovieTheatre,
};
