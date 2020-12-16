const mongoCollections = require("../config/mongoCollections");
const movieTheatreRatings = mongoCollections.movieTheatreRatings;
const movieTheatres = mongoCollections.movieTheatres;
// const movieTheatreData = require("./movietheatres");

async function addRating(data) {

  const ratingCollection = await movieTheatreRatings();
  const movieTheatreCollection = await movieTheatres();

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  // let theaterId = ObjectId(data.theaterId); 
  // we should be using the Movie_Theatre_id straight up without doing anything when storing in DB.

  // we need to get this from the current session/cookie who the user is
    // remove this and use data.User_id in the object once things are up in running

  let userId;
  if (!data.User_id) 
    userId = ObjectId("5fd7a040f7626f2db0517ebb");
  else
    userId = data.User_id;


  let ratingData = {
    User_id: userId,
    Movie_Theatre_id: ObjectId(data.Movie_Theatre_id),
    Rating: data.Rating,
    Review: data.Review,
  };

  let insertedRating = await ratingCollection.insertOne(ratingData);

  if (insertedRating.insertedCount === 0) throw "Movie was not created";

  let ratingId = insertedRating.insertedId.toString();

  const ratingDetails = await getRatingById(ratingId);

  console.log(ratingDetails);

  // Need to push the ratingDetails._id into the Movie Theatre table's "User_Reviews" array column
  let movieTheatreRatingUpdate = await movieTheatreCollection.updateOne(
    { _id: data.Movie_Theatre_id },
    { $push: { User_Reviews: insertedRating.insertedId } }
  );

  console.log(movieTheatreRatingUpdate);

  return ratingDetails;
}


// get single movie rating based on ID
async function getRatingById(ratingId) {
  console.log("iansdasdasnd ")
  console.log(!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
  // return
  const ratingCollection = await movieTheatreRatings();

  if (!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
    throw "Please enter a valid rating ID";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newratingId = ObjectId(ratingId);

  const rating = await ratingCollection.findOne({ _id: newratingId }); //findOne({ Movie_Name: movie });

  if (!rating) throw "Rating not found..........";
  return rating;
}

async function getRatingByTheatreId(Movie_Theatre_id) {
  // console.log("theatreId1", Movie_Theatre);
  const ratingCollection = await movieTheatreRatings();

  console.log("theatreId2", Movie_Theatre_id);

  if (
    !Movie_Theatre_id ||
    (typeof Movie_Theatre_id !== "string" &&
      Movie_Theatre_id.trim().length == 0)
  )
    throw "Please enter a valid theatre id 2";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newtheatreId = ObjectId(Movie_Theatre_id);

  const theatre = await ratingCollection.findOne({
    Movie_Theatre_id: newtheatreId,
  }); //findOne({ Movie_Name: movie });
  console.log("After finding the rating for the movietheatre", theatre);

  if (!theatre) throw "Movie not found..........";
  return theatre;
}

module.exports = {
  addRating,
  getRatingById,
  getRatingByTheatreId,
};
