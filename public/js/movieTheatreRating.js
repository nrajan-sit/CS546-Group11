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
    let Rating = $("#rating-theatre").val();
    let Review = $("#review-theatre").val().trim();
    let Movie_Theatre_id = $("#theatreId").val().trim();
    // let User_id;

    console.log("Submit button clicked from rating");
    event.preventDefault();
    var data = {
      // User_id,
      Rating,
      Review,
      Movie_Theatre_id
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
