const mongoCollections = require("../config/mongoCollections");
const movieTheatreRatings = mongoCollections.movieTheatreRatings;
const movieTheatreData = require("./movietheatres");

async function addRating(data) {
  const ratingCollection = await movieTheatreRatings();
  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let theaterId = ObjectId(data.theaterId);
  let userId = ObjectId('5fd7a040f7626f2db0517ebb');
  let ratingData = {
    rating: data.rating,
    review: data.review,
    theatreId: theaterId,
    userId: userId
  };

  let insertedRating = await ratingCollection.insertOne(ratingData);

  if (insertedRating.insertedCount === 0) throw "Movie was not created";

  let ratingId = insertedRating.insertedId.toString();

  const ratingDetails = await getRatingById(ratingId);

  console.log(ratingDetails);

  return ratingDetails;
}
// get single movie rating based on ID
async function getRatingById(ratingId) {
  console.log("iansdasdasnd ")
  console.log(!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
  // return
  const ratingCollection = await movieTheatreRatings();

  if (!ratingId || (typeof ratingId !== "string" && ratingId.trim().length == 0))
    throw "Please enter a valid movie name 1";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newratingId = ObjectId(ratingId);

  const rating = await ratingCollection.findOne({ _id: newratingId }); //findOne({ Movie_Name: movie });

  if (!rating) throw "Movie not found..........";
  return rating;
}

async function getRatingByTheatreId(theatreId) {
  const ratingCollection = await movieTheatreRatings();
  console.log("theatreId",theatreId)
  if (!theatreId || (typeof theatreId !== "string" && theatreId.trim().length == 0))
    throw "Please enter a valid thater id 2";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

  let newtheatreId = ObjectId(theatreId);

  const theare = await ratingCollection.find({ theatreId: newtheatreId }).toArray(); //findOne({ Movie_Name: movie });

  if (!theare) throw "Movie not found..........";
  return theare;
}

module.exports = {
  addRating,
  getRatingById,
  getRatingByTheatreId,
};
