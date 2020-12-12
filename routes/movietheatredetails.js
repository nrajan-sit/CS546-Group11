const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));

// router.get("/", async (req, res) => {
//   console.log("inside movie theatre details do nothing");
//   // console.log(req.params.id);
//   // const currentMovies = await movieData.getMovie(req.params.id);
//   // console.log("And the movei is :- ", currentMovies);
//   // res.render("movie/moviedetails", { currentMovies: currentMovies });
// });

router.get("/:id", async (req, res) => {
  console.log("inside movie theatre details ......");
  // console.log(req.params.id);
  const movieTheatreDetails = await movieTheatreData.getMovieTheatre(req.params.id);
  const movieTheatreShowtimeDetails = await movieTheatreData.getCurrentPlayingMoviesforMovieTheatre(req.params.id);
  let { ObjectId } = require("mongodb");
  //console.log(typeof ObjectId);

//   let newMovieId = ObjectId(movie);
  let finalMovieList = []
  let counter = 0;
    for(i=0;i<movieTheatreShowtimeDetails.length;i++){
        counter = 0;
        if(movieTheatreShowtimeDetails[i].MovieDetails.length != 0)
            for(j=0;j<movieTheatreShowtimeDetails[i].MovieDetails.length;j++)
                if(movieTheatreShowtimeDetails[i].MovieDetails[j].Movie_Theatre_id.equals(movieTheatreDetails._id)){

                // console.log("-------------", ObjectId(movieTheatreShowtimeDetails[i].MovieDetails[j].Movie_Theatre_id));
                // console.log("------------->", ObjectId(movieTheatreDetails._id));
                // if(ObjectId(movieTheatreShowtimeDetails[i].MovieDetails[j].Movie_Theatre_id) == ObjectId(movieTheatreDetails._id)){
                    counter = counter + 1;
                    // console.log("They the same")
                // }
                    
                }
        if(counter>0)
            finalMovieList.push(movieTheatreShowtimeDetails[i]);
    }

    // console.log("------------- ", movieTheatreShowtimeDetails);
  console.log("And the movei is :- ", movieTheatreDetails);

  res.render("movietheatre/movietheatredetails", { movieTheatreDetails: movieTheatreDetails,movieTheatreShowtimeDetails:finalMovieList });
  console.log("......inside movie details ......");
});

module.exports = router;
