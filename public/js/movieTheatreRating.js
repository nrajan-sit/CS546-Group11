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
    return;
  });
})(window.jQuery);
