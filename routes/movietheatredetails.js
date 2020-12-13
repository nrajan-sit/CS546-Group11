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
    const movieTheatreShowtimeDetails1 = await movieTheatreData.getMovieShowtimes();
    const movieTheatreShowtimeDetails2 = await movieTheatreData.getMovieShowtimes();
    const movieTheatreShowtimeDetails3 = await movieTheatreData.getMovieShowtimes();

    // let { ObjectId } = require("mongodb");
    //console.log(typeof ObjectId);

    // Get the dates for the Tabs
    let dayArray = []
    let day1 = new Date();
    console.log(day1);
    console.log(day1.toLocaleString());
    console.log(day1);
    dayArray[0] = day1.toISOString().slice(0, 10);

    day1.setDate(day1.getDate() + 1);
    dayArray[1] = day1.toISOString().slice(0, 10);

    day1.setDate(day1.getDate() + 1);
    dayArray[2] = day1.toISOString().slice(0, 10);

    let finalMovieList1 = [];
    let finalMovieList2 = [];
    let finalMovieList3 = [];

    // console.log(finalMovieList1);

    // prep the 3 showtimelists
    for(i=0;i<movieTheatreShowtimeDetails1.length;i++)
        if(movieTheatreShowtimeDetails1[i].MovieDetails.length != 0)
            finalMovieList1.push(movieTheatreShowtimeDetails1[i]);

    for(i=0;i<movieTheatreShowtimeDetails2.length;i++)
        if(movieTheatreShowtimeDetails2[i].MovieDetails.length != 0)
            finalMovieList2.push(movieTheatreShowtimeDetails2[i]);

    for(i=0;i<movieTheatreShowtimeDetails3.length;i++)
        if(movieTheatreShowtimeDetails3[i].MovieDetails.length != 0)
            finalMovieList3.push(movieTheatreShowtimeDetails3[i]);

    console.log(finalMovieList2);

    let count = 0;
    let whileloop = 0;

    // split the showtimes for the dates
    let k = 0;
    while(k < finalMovieList1.length){
        let j = 0;

        // console.log(finalMovieList1[i].MovieDetails);
        while(j < finalMovieList1[k].MovieDetails.length){
                // console.log("Before --------------------------------------")
                // console.log(finalMovieList1[i].MovieDetails[j]);
            if (finalMovieList1[k].MovieDetails[j].Date != dayArray[0] || !finalMovieList1[k].MovieDetails[j].Movie_Theatre_id.equals(movieTheatreDetails._id)) {
                // console.log("spliced : " , finalMovieList1[i].MovieDetails[j].Date, "--", dayArray[0]);
                finalMovieList1[k].MovieDetails.splice(j, 1);
                j = 0;
            }
            else
                j = j + 1;
        }

        if(finalMovieList1[k].MovieDetails.length == 0){
            finalMovieList1.splice(k, 1);
            k = 0
        }
        else
        k = k + 1;
    }


    k = 0;
    while(k < finalMovieList2.length){
        let j = 0;

        while(j < finalMovieList2[k].MovieDetails.length){
            if (finalMovieList2[k].MovieDetails[j].Date != dayArray[1] || !finalMovieList2[k].MovieDetails[j].Movie_Theatre_id.equals(movieTheatreDetails._id)) {
                finalMovieList2[k].MovieDetails.splice(j, 1);
                j = 0;
            }
            else
                j = j + 1;
        }

        if(finalMovieList2[k].MovieDetails.length == 0){
            finalMovieList2.splice(k, 1);
            k = 0
        }
        else
        k = k + 1;
    }

    k = 0;
    while(k < finalMovieList3.length){
        let j = 0;

        while(j < finalMovieList3[k].MovieDetails.length){
            if (finalMovieList3[k].MovieDetails[j].Date != dayArray[2] || !finalMovieList3[k].MovieDetails[j].Movie_Theatre_id.equals(movieTheatreDetails._id)) {
                finalMovieList3[k].MovieDetails.splice(j, 1);
                j = 0;
            }
            else
                j = j + 1;
        }

        if(finalMovieList3[k].MovieDetails.length == 0){
            finalMovieList3.splice(k, 1);
            k = 0
        }
        else
        k = k + 1;
    }

    // for(i=0;i<movieTheatreShowtimeDetails.length;i++){
    //     counter = 0;
    //     if(movieTheatreShowtimeDetails[i].MovieDetails.length != 0)
    //         for(j=0;j<movieTheatreShowtimeDetails[i].MovieDetails.length;j++)
    //             if(movieTheatreShowtimeDetails[i].MovieDetails[j].Movie_Theatre_id.equals(movieTheatreDetails._id)){
    //                 console.log(movieTheatreShowtimeDetails[i].MovieDetails[j].Date)
    //                 if(movieTheatreShowtimeDetails[i].MovieDetails[j].Date == dayArray[0]){
    //                     finalMovieList1[i].MovieDetails[j].push(movieTheatreShowtimeDetails[i].MovieDetails[j])
    //                     console.log("we up in here")
    //                 }
                        

    //                 if(movieTheatreShowtimeDetails[i].MovieDetails[j].Date == dayArray[1])
    //                     finalMovieList2[i].MovieDetails[j].push(movieTheatreShowtimeDetails[i].MovieDetails[j])

    //                 if(movieTheatreShowtimeDetails[i].MovieDetails[j].Date == dayArray[2])
    //                     finalMovieList3[i].MovieDetails[j].push(movieTheatreShowtimeDetails[i].MovieDetails[j])
    //             }

    // }




    // console.log("And the movei is :- ", finalMovieList1);
    console.log("And the movei is :- ", finalMovieList2);
    // console.log("And the movei is :- ", day2);
    // console.log("And the movei is :- ", day3);

    // console.log("------------- ", movieTheatreShowtimeDetails);
    //   console.log("And the movei is :- ", movieTheatreDetails);

  res.render("movietheatre/movietheatredetails", {
    movieTheatreDetails: movieTheatreDetails,
    movieTheatreShowtimeDetails1: finalMovieList1,
    movieTheatreShowtimeDetails2: finalMovieList2,
    movieTheatreShowtimeDetails3: finalMovieList3,
    timeTab: dayArray,
  });
  console.log("......inside movie details ......");
});

module.exports = router;
