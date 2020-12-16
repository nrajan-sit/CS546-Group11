(function ($) {
  var movieSearchList = $("#movieSearchList"); // id of the list you want to populate in html
  // var showDetail = $("#show");
  var body = $("#body");
  var searchLink = $("#searchForm");
  var searchText = $("#search_term");
  // var navtab = $("navbarSupportedContent");

  console.log("in em AJAX1");

  // $.ajax(requestConfig).then(function (responseMessage) {

  //     // console.log(responseMessage)
  //     event.preventDefault();
  //     var allShows = $(responseMessage);
  //     $.each(allShows, function(i, singleShow){
  //         showList.append("<li> <a href = "+singleShow._links.self.href+"> "+singleShow.name+"</a> </li>");
  //     })
  //     //showList.toggle(); // change hidden tag
  //     showList.show();
  //     showDetail.hide();
  // });
  
  /***************************** Search Form Submission *****************************/
  searchLink.submit(function (event) {
    console.log("Submit button clicked");
    event.preventDefault();
    // movieSearchList.show();
    body.hide();

    let searchedMovie = searchText.val();
    // console.log("Searched movie is :" ,searchedMovie);
    movieSearchList.empty(); // empty the movielist element

    if (searchedMovie.trim().length == 0)
      movieSearchList.append(
        `<li>The input : ${JSON.stringify(
          searchedMovie
        )} needs to be movie. </li>`
      );
    else {
      // console.log("Sup")
      movieSearchList.append(
        `<p> Search Results for : ${JSON.stringify(searchedMovie)}</p>`
      );

      var requestConfig = {
        method: "GET",
        url: "http://localhost:3000/search/" + searchedMovie,
      };

      // console.log("in em AJAX2")
      // console.log(requestConfig);

      $.ajax(requestConfig).then(function (responseMessage) {
        // console.log("here1",responseMessage)
        event.preventDefault();
        var allMovies = $(responseMessage);
        // console.log("here2",allMovies);
        // console.log("allMovies.length : ", allMovies.length);
        // movieSearchList.append("<ol>");
        if (allMovies.length == 0)
          movieSearchList.append("<li> No Movies found </li>");
        else
          $.each(allMovies, function (i, singleMovie) {
            // console.log('hello')
            // console.log(singleMovie.Movie_Name);
            movieSearchList.append(
              `<li id="searchimage"> <a href = /moviedetails/${singleMovie._id}> <img src=${singleMovie.Movie_Poster}></a> ${singleMovie.Movie_Name}</li> <br>`
            );
          });
      });
    }
    // console.log(movieSearchList);
    // movieSearchList.append("</ol>");
    movieSearchList.show();
    // showDetail.hide();
    // homeLink.hide();
  });


  // navtab.on('click', "nav-item", function () {
  //     console.log("NAV TAB CLICKED");
  //     event.preventDefault();

  // });

  /***************************** Link Clicked *****************************/
  // showList.on('click', "a", function () {

  //     // console.log("Show Link clicked");
  //     event.preventDefault();
  //     var currentShow = $(this).attr("href");
  //     // var currentLink = $(this);
  //     // console.log(currentLink);
  //     // var currentId = currentLink.data();
  //     // console.log(currentId);
  //     // console.log($(this).attr('href'));

  //     var requestConfig = {
  //         method: 'GET',
  //         url: currentShow
  //     };

  //     $.ajax(requestConfig).then(function (responseMessage) {

  //         var singleShowDetail = $(responseMessage);

  //         // console.log("Show details ->");
  //         // console.log(singleShowDetail[0]);
  //         let showDeets = singleShowDetail[0];

  //         let singleShowDetailNEW_temp = {
  //           ShowName: replaceNULL(showDeets.name),
  //           image: replaceNULLimage(showDeets.image),
  //           language: replaceNULL(showDeets.language),
  //           genres: replaceNULL(showDeets.genres),
  //           averageRating: replaceNULL(showDeets.rating), //.average,
  //           networkName: replaceNULL(showDeets.network), //.name,
  //           summary: replaceNULL(showDeets.summary),
  //         };

  //         // console.log("before")
  //         let singleShowDetailNEW = singleShowDetailNEW_temp
  //         // console.log("after");
  //         // console.log(singleShowDetailNEW);
  //         // console.log(singleShowDetailNEW.ShowName);

  //         //showList.toggle(); // hide showlist element
  //         showList.hide();
  //         showDetail.empty(); // empty the show element

  //         // setup genres
  //         let genreArr = "<ul>";
  //         if(!singleShowDetailNEW_temp.genres || singleShowDetailNEW_temp.genres.length == 0)
  //             genreArr = "N/A"
  //         else{
  //             for (i = 0; i < singleShowDetailNEW_temp.genres.length; i++)
  //                 genreArr = genreArr + "<li>" + singleShowDetailNEW_temp.genres[i] + "</li>";
  //             genreArr = genreArr + "</ul>";
  //         }

  //         // setup image
  //         let imagesrc = "";
  //         if (!singleShowDetailNEW_temp.image.medium)
  //             imagesrc = "/public/js/no_image.jpeg"
  //         else
  //             imagesrc = singleShowDetailNEW_temp.image.medium

  //         showDetail.append("<h1> " + singleShowDetailNEW.ShowName + "</h1>");
  //         showDetail.append("<img src=" + imagesrc +">");
  //         showDetail.append(
  //           "<dl> <dt>Language</dt> <dd>" +
  //             singleShowDetailNEW.language +
  //             "</dd><dt>Genres</dt> <dd>" +
  //             genreArr +
  //             "</dd><dt>Average Rating</dt> <dd>" +
  //             replaceNULL(singleShowDetailNEW.averageRating.average) +
  //             "</dd><dt>Network Name</dt> <dd>" +
  //             replaceNULL(singleShowDetailNEW.networkName.name) +
  //             "</dd><dt>Summary</dt> <dd>" +
  //             singleShowDetailNEW.summary +
  //             "</dd> </dl>"
  //         );

  //         showList.hide();
  //         homeLink.show();
  //         showDetail.show();
  //     });
  // })
})(window.jQuery);
