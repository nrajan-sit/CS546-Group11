const mongoCollections = require("../config/mongoCollections");
const allMovies = mongoCollections.movies;
const allShowtimes = mongoCollections.showtime;
const allMovieTheatres = mongoCollections.movieTheatres;
const movieTheatreData = require("../data/movietheatres");

// get showtimedetails
async function getShowtime(showtimeID) {
  const showTimeCollection = await allShowtimes();

  if (!showtimeID || (typeof showtimeID == "string" && showtimeID.trim().length == 0))
    throw "Please enter a valid movie name";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let newshowtimeID = ObjectId(showtimeID);

  const showtimeDeets = await showTimeCollection.findOne({ _id: newshowtimeID }); 

  if (!showtimeDeets) throw "Showtime not found..........";

  return showtimeDeets;
}






/*****************************************************************************************

                                Creating the DB for Showtimes

(This is for seeding purposes only)   

--------------------------
        Showtime
--------------------------

“_id":"",
"Movie_Theatre_id":"",
"Movie_id":"",
"Date":"",
"Time":"",
"All_Seats" : [""] ,
"Avaliable_Seats" : [""]

/*****************************************************************************************/


async function createShowtimes(
  Movie_Theatre_id,
  Movie_id,
  Date,
  Time,
  All_Seats,
  Avaliable_Seats
) {
  const showTimeCollection = await allShowtimes();

  // create movie object
  let newShowtime = {
    Movie_Theatre_id: Movie_Theatre_id,
    Movie_id: Movie_id,
    Date: Date,
    Time: Time,
    All_Seats: All_Seats,
    Avaliable_Seats: Avaliable_Seats
  };

  let insertednewShowtime = await showTimeCollection.insertOne(newShowtime);

  if (insertednewShowtime.insertedCount === 0) throw "Showtime was not created";

  let newShowTimeId = insertednewShowtime.insertedId;

  const showTimeDetails = await getShowtime(newShowTimeId);

  // console.log(showTimeDetails);

  return showTimeDetails;
}






module.exports = {
  getShowtime,
  createShowtimes,
};
