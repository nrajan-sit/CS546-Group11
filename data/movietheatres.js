const mongoCollections = require("../config/mongoCollections");
const allMoviesTheatres = mongoCollections.movieTheatres;
const allShowtimes = mongoCollections.showtime;
const allMovies = mongoCollections.movies;


// get single movie theatre based on ID
async function getMovieTheatre(movieTheatre) {
  const movieCollection = await allMoviesTheatres();

  if (!movieTheatre || (typeof movieTheatre == "string" && movieTheatre.trim().length == 0))
    throw "Please enter a valid movie theatre name";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let newMovieTheatreId = ObjectId(movieTheatre);

  const movieTheatreID = await movieCollection.findOne({ _id: newMovieTheatreId });

  if (!movieTheatreID) throw "Movie Theatre not found..........";
  return movieTheatreID;
}


// Get all the movietheatres
async function getMovieTheatreList() {
  const movieTheatreCollection = await allMoviesTheatres();
  // const showtimeCollection = await allShowtimes();
  const movieTheatreArray = await movieTheatreCollection.find({}).toArray();

  return movieTheatreArray;
}

// Currently playing movies
async function getMovieShowtimes() {
  // console.log("Inside getCurrentPlayingMoviesforMovieTheatre");
  // const theatreID = await getMovieTheatre(movieTheatreID);
  // console.log("Theatres id yyoooo ",theatreID)

  const movieCollection = await allMovies();

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
      ]).toArray();


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



async function createMovieTheatreWithShowTimes(movieTheatreID, date){

  const movieTheatreDetails = await getMovieTheatre(movieTheatreID);
  const movieTheatreShowtimeDetails1 = await getMovieShowtimes();

  let finalMovieList1 = [];

  // prep the showtimelists
  for (i = 0; i < movieTheatreShowtimeDetails1.length; i++)
    if (movieTheatreShowtimeDetails1[i].MovieDetails.length != 0)
      finalMovieList1.push(movieTheatreShowtimeDetails1[i]);

  // split the showtimes for the dates
  let k = 0;
  while (k < finalMovieList1.length) {
    let j = 0;

    // console.log(finalMovieList1[i].MovieDetails);
    while (j < finalMovieList1[k].MovieDetails.length) {
      if (
        finalMovieList1[k].MovieDetails[j].Date != date || //dayArray[0] ||
        !finalMovieList1[k].MovieDetails[j].Movie_Theatre_id.equals(
          movieTheatreDetails._id
        )
      ) {
        // console.log("spliced : " , finalMovieList1[i].MovieDetails[j].Date, "--", dayArray[0]);
        finalMovieList1[k].MovieDetails.splice(j, 1);
        j = 0;
      } else j = j + 1;
    }

    if (finalMovieList1[k].MovieDetails.length == 0) {
      finalMovieList1.splice(k, 1);
      k = 0;
    } else k = k + 1;
  }

  // console.log("And the movei is :- ", finalMovieList1);
  // console.log("And the movei is :- ", finalMovieList2);
  // console.log("And the movei is :- ", day2);
  // console.log("And the movei is :- ", day3);

  // console.log("------------- ", movieTheatreShowtimeDetails);
  //   console.log("And the movei is :- ", movieTheatreDetails);

  return finalMovieList1;
}




/*****************************************************************************************

                                Creating the DB for Movie Theatres

(This is for seeding purposes only)   

--------------------------
        Movie Theatres
--------------------------

"Movie_Theatre_Name":"",
"Showtime_arr ":[“”],
"Address_Line_1":""
"Address_Line_2":"",
"City":"",
"State":"",
"Zip":"",
"User_Reviews":[""]

/*****************************************************************************************/


async function createMovieTheatres(
  Movie_Theatre_Name,
  Showtime_arr,
  Address_Line_1,
  Address_Line_2,
  City,
  State,
  Zip,
  User_Reviews
) {
  const movieTheatreCollection = await allMoviesTheatres();

  // create movie object
  let newMovieTheatre = {
    Movie_Theatre_Name: Movie_Theatre_Name,
    Showtime_arr: Showtime_arr,
    Address_Line_1: Address_Line_1,
    Address_Line_2: Address_Line_2,
    City: City,
    State: State,
    Zip: Zip,
    User_Reviews: User_Reviews,
  };

  let insertednewMovieTheatre = await movieTheatreCollection.insertOne(newMovieTheatre);

  if (insertednewMovieTheatre.insertedCount === 0)
    throw "MovieTheatre was not created";

  let newMovieTheatreId = insertednewMovieTheatre.insertedId;

  const movieTheatreDetails = await getMovieTheatre(newMovieTheatreId);

  // console.log(movieTheatreDetails);

  return movieTheatreDetails;
}

module.exports = {
  getMovieTheatre,
  getMovieTheatreList,
  getMovieShowtimes,
  createMovieTheatreWithShowTimes,
  // seeding things
  createMovieTheatres,
};
