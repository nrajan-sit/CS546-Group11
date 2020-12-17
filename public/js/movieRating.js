(function ($) {
  $("#movieRatingSubmit").submit(function (event) {
    let rating = $("#rating").val();
    let review = $("#review").val().trim();
    let movieId = $("#movieId").val().trim();
    console.log("Submit button clicked from rating");
    event.preventDefault();
    if (!review) {
      alert("please enter your review");
      return;
    }
    var data = {
      // User_id,
      Rating: parseInt(rating,10),
      Review: review,
      Movie_id: movieId
    };
    console.log("Data", data);
    var requestConfig = {
      method: "POST",
      url: "http://localhost:3000/movierating/addReview",
      data: data,
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        window.location.href = "http://localhost:3000/moviedetails/"+movieId
    })
    return;
  });
})(window.jQuery);
