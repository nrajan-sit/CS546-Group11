(function ($) {
  $("#movieRatingSubmit").submit(function (event) {
    let rating = $("#rating").val();
    let review = $("#review").val().trim();
    let movieId = $("#movieId").val().trim();
    console.log("Submit button clicked from rating");
    event.preventDefault();
    var data = {
      rating,
      review,
      movieId,
      userId: "some user id",
    };
    console.log("Data", data);
    var requestConfig = {
      method: "POST",
      url: "http://localhost:3000/search/",
      data: data,
    };
    return;
  });
})(window.jQuery);
