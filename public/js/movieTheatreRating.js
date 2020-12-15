(function ($) {
  $("#hideRating").css("display","none")
  $("#theatreRatingDiv").css("display","none")
  $("#showRating").click(function(event) {
    event.preventDefault();
    $("#theatreRatingDiv").css("display","block")
    $("#hideRating").css("display","block")
    $("#showRating").css("display","none")
    console.log("show rating clicked")
  })
  $("#hideRating").click(function(event) {
    event.preventDefault();
    $("#theatreRatingDiv").css("display","none")
    $("#showRating").css("display","block");
    $("#hideRating").css("display","none")
    console.log("hide rating clicked")
  })
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
      location.replace(document.referrer);
    });
    return;
  });
})(window.jQuery);
