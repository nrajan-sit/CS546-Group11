(function ($) {
  $("#movieTheatreRatingSubmit").submit(function (event) {
    let rating = $("#rating-theatre").val();
    let review = $("#review-theatre").val().trim();
    let theaterId = $("#theatreId").val().trim();
    console.log("Submit button clicked from rating");
    event.preventDefault();
    var data = {
      rating,
      review,
      theaterId,
    };
    console.log("Data", data);

    var requestConfig = {
      method: "POST",
      url: "http://localhost:3000/movietheatrerating/addReview",
      data: data,
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        window.location.href = "http://localhost:3000/movietheatres/"
    })
    return;
  });
})(window.jQuery);
