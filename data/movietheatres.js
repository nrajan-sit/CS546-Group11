const mongoCollections = require("../config/mongoCollections");
// const showtime = require("../config/mongoCollections");
const allMoviesTheatres = mongoCollections.movieTheatres;
const allShowtimes = mongoCollections.showtime;
const allMovies = mongoCollections.movies;


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
    // console.log(movieTheatreID);
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
async function getMovieShowtimes() {
  // console.log("Inside getCurrentPlayingMoviesforMovieTheatre");
//   const theatreID = await getMovieTheatre(movieTheatreID);
  // console.log("Theatres id yyoooo ",theatreID)

//   const allMovieTheatres = await allMoviesTheatres();
//   const showtimeCollection = await allShowtimes();
  const movieCollection = await allMovies();
  //   const movieArray = await movieCollection.find({}).toArray();

  //We need to require ObjectId from mongo
//   let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

//   let newMovieTheatreId = ObjectId(movieTheatreID);

  // Get the showtimes for the movietheatre along with the movie details
    const movieArray = await movieCollection
      .aggregate([
        {
          $lookup: {
            from: "Showtime",
            localField: "_id",
            foreignField: "Movie_id",
            as: "MovieDetails",
          },
        }
        // { $match: { Movie_Theatre_id: newMovieTheatreId } },
      ])
      .toArray();


      // this works
    //   const movieArray = await showtimeCollection
    //     .aggregate([
    //       {
    //         $lookup: {
    //           from: "MovieTheatres",
    //           localField: "Movie_Theatre_id",
    //           foreignField: "_id",
    //           as: "MovieTheatreDetails",
    //         },
    //       },
    //       { $match: { Movie_Theatre_id: newMovieTheatreId } },
    //       {
    //         $lookup: {
    //           from: "Movies",
    //           localField: "Movie_id",
    //           foreignField: "_id",
    //           as: "MovieDetails",
    //         },
    //       },
    //     ])
    //     .toArray();


  //   for (i = 0; i < movieTheatreArray.length; i++) {
  //     if (movieTheatreArray[i].Release_Date < today) currentMovies.push(movieArray[i]);
  //   }
//   console.log("------------------------------");
//   console.log(movieArray[0]);
//   console.log("------------------------------");

  return movieArray;
}

// Currently playing movies for X date
// async function getCurrentPlayingMoviesforMovieTheatreonDate(movieTheatreID,Date) {
//   // console.log("Inside getCurrentPlayingMoviesforMovieTheatre");
//   const theatreID = await getMovieTheatre(movieTheatreID);
//   // console.log("Theatres id yyoooo ",theatreID)

//   const allMovieTheatres = await allMoviesTheatres();
//   const showtimeCollection = await allShowtimes();
//   const movieCollection = await allMovies();
//   //   const movieArray = await movieCollection.find({}).toArray();

//   //We need to require ObjectId from mongo
//   let { ObjectId } = require("mongodb");
//   //console.log(typeof ObjectId);

//   let newMovieTheatreId = ObjectId(movieTheatreID);

//   // Get the showtimes for the movietheatre along with the movie details
//     const movieArray = await movieCollection
//       .aggregate([
//         {
//           $lookup: {
//             from: "Showtime",
//             localField: "_id",
//             foreignField: "Movie_id",
//             as: "MovieDetails",
//           },
//         }
//         // { $match: { Movie_Theatre_id: newMovieTheatreId } },
//       ])
//       .toArray();

//     //   console.log("------------------------------");
//     //   console.log(movieArray[0]);
//     //   console.log("------------------------------");

//   return movieArray;
// }

module.exports = {
  getMovieTheatre,
  getMovieTheatreList,
  getMovieShowtimes,
};
