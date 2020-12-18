(function ($) {
  var movieSearchList = $("#movieSearchList"); // id of the list you want to populate in html
  // var showDetail = $("#show");
  var body = $("#body");
  var searchLink = $("#searchForm");
  var searchText = $("#search_term");
  // var navtab = $("navbarSupportedContent");

  // console.log("in em AJAX1");

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
    // console.log("Submit button clicked");
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


})(window.jQuery);
