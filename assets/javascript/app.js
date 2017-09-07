var newHeader;
var newImage;
var newAddress;
var newRating;
var newCoupons = [];

var userEmail = 'test@email.com';



//initialize function
function init() {
    $("#restaurantDiv").hide();
    $("#dislikeButton").hide();
    $("#likeButton").hide();
    $(".form-signin").hide();
    $("#main-content").css("margin", "20px 0");
    $("#spacer").removeClass("col-md-4 col-sm-3 col-xs-1");
    $("#spacer").addClass("col-md-3 col-sm-3 col-xs-3");
    $("#main-content").removeClass("col-md-4 col-sm-6 col-xs-10");
    $("#main-content").addClass("col-md-6 col-sm-6 col-xs-6");
    $("#welcome").append("<img id='logo' src='assets/images/logo.png' width='150px'> <h3>Welcome to Foupon. The web app thats lets you create a profile of local restaurants and automatically shows you all the best deals!!</h3>  <button id='new-user' class=' sign-in btn btn-lg btn-primary btn-block' type='submit'>Sign Up</button><button id='logIn' class='sign-in btn btn-lg btn-primary btn-block' type='submit'>Log In</button>");
}
init();

$("#logIn").on("click", function(){
  $("#spacer").removeClass("col-md-3 col-sm-3 col-xs-3");
  $("#spacer").addClass("col-md-4 col-sm-3 col-xs-1");
  $("#main-content").removeClass("col-md-6 col-sm-6 col-xs-6");
  $("#main-content").addClass("col-md-4 col-sm-6 col-xs-10");
  $("#welcome").hide();
  $(".form-signin").show();
});

// On Search Button Click
$("#submitButton").on("click", function(e) {
        e.preventDefault();
        //value from search-input
        var searchValue = $("#search-input").val().trim();
        //your API key
        var annaAPI = 'AIzaSyDfIrwEUZ0uUeJT2hDf9mK5ISRRT2einag';
        var jonAPI = 'AIzaSyDcvNrflCgCWKKMnOXp4q8gcDNAftiSPew';
        var ricardoAPI = 'AIzaSyDYhDV3HvYPA4nty4qZ5TqvKNCNxGgtErg';
        //proxy url for the class
        var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';
        //Get current City value
        var place = $("#city-input").val().trim();
        //the url for google places
        var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+searchValue+ 'in+' + place + '&key=' + ricardoAPI;

        var testArray = ['x','y','z'];

        // AJAX Call to Google Places API
        $.ajax({
            url: apiURL,
            method: 'POST',
            data: {
                'url': queryURL
            }
        }).done(function(response) {
          e.preventDefault();
          var res = JSON.stringify(response);
          console.log('AJAX RESPONSE = ', response)
          var responseArray = response.data.results;
          var placeName;
          //Define Counter Variable
          var i = 0;
          // Define Restaurant Info Div
          var restaurantDiv = $('#restaurantDiv');
          //Build DIV Content Functions to Update with the counter variable
          //Heade Function
           newHeader = function() { return  $('<h3 id="resultName">').text(responseArray[i].name)};
          //Create Img Func
           newImage = function(){
            if (responseArray[i].photos) {
              { return $('<img />', {src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=300&photoreference=' + responseArray[i].photos[0].photo_reference + '&key=' + ricardoAPI })}
            } else if (responseArray[i].photos == null || responseArray[i].photos == false){
                return $('<img/>'), {src: '../images/noImg.jpg'};
            }
          };
          //Create Address P Func
           newAddress = function() { return $('<p id="resultAddress">').text(responseArray[i].formatted_address)};
          //Create Rating P Func
           newRating = function() { return $('<p id="resultRating">').text('Rating: ' + responseArray[i].rating)};

          //Set Data Attributes To Like Button for Info Storage in order to push to firebase
          $("#likeButton").data("name", responseArray[i].name);
          $("#likeButton").data("address", responseArray[i].formatted_address);
          $("#likeButton").data("rating", responseArray[i].rating);
          $("#likeButton").data("userEmail", userEmail);


          //////// Append to DIV
          //Append Name
          restaurantDiv.html(newHeader);
          //Append 1st Image
          restaurantDiv.append(newImage);
          //Append Address
          restaurantDiv.append(newAddress);
          //Append Result Restaurant Rating
          restaurantDiv.append(newRating);

                  $('.decision').on('click', function(){
                      i++;
                      placeName = responseArray[i].name;

                      //Step through Response Array Results
                          if(i < responseArray.length) {
                            /////Update restaurantDiv
                            //Update Name Header
                            restaurantDiv.html(newHeader());
                            //Update Image
                            restaurantDiv.append(newImage());
                            //Prepend Address
                            restaurantDiv.append(newAddress());
                            //Prepend Result Restaurant Rating
                            restaurantDiv.append(newRating());
                            $("#likeButton").data("name", responseArray[i].name);
                            $("#likeButton").data("address", responseArray[i].formatted_address);
                            $("#likeButton").data("rating", responseArray[i].rating);

                          } else {
                            alert("ran out of coupons");
                          }

                    });


                  // On Button Like Click, Query For Coupons With Same Parameters as Original Search
                  $('#likeButton').on('click', function(){
                    var likeButtonData = $(this).attr("data-coupon");
                    var sqootAPI = 'GD6dkmwuVjt_Ia8tQSC8';
                    var sqootURL = 'http://api.sqoot.com/v2/deals?api_key=' + sqootAPI + '&location=' + place + '&query=' + searchValue;
                            console.log('queryURL ===', sqootURL)
                            $.ajax({
                                'url' : sqootURL,
                                method: "GET"
                            })
                            .done(function(response) {
                            //Log Sqoot Resonse
                            console.log('SQOOT AJAX RESPONSE===',response);
                            var couponArray = response.deals;
                                  for (var j = 0; j < couponArray.length; j++) {
                                    // Current Name of Coupon/Coupon Info
                                    var couponName = couponArray[j].deal.short_title;
                                    // Log Current Coupon Name
                                    console.log('CURRENT COUPON NAME ===', couponName);
                                    console.log('PLACE NAME===', placeName);
                                          // If any of the Coupon Details include the Name of the Restaurant, Add to newCoupons Array
                                            if (couponName.toLowerCase().match(placeName.toLowerCase())) {
                                              newCoupons.push(couponArray[j].deal.short_title);
                                              console.log('NEW COUPON ADDED, YES====', newCoupons);
                                          }
                                  }
                            })

                  });
        //Closes AJAX Done Function
    });
    $("#restaurantDiv").show();
    $("#dislikeButton").show();
    $("#likeButton").show();
    $("#searchbar").css("margin", "10px 0 25px 0");
    //Closes Search Button Function
});



// let startingButton = function() {
//     for (var i = 0; i < startingButton.length; i++) {
//         $("#defaultSearchButtons").append("<button class='btn btn-info' id=" + startingButtons[i] + " value=" + startingButtons[i] + ">" + startingButtons[i] + "</button>");
//     }
//     $("button").click(function() {
//         var fired_button = $(this).val().trim();
//         event.preventDefault();
//         let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fired_button + "&api_key=95bfdd6cda3f400aa1f2c12d2ba93f14&limit=10";
//         $.ajax({ url: queryURL, method: 'GET' })
//             .done(function(response) {
//                 for (var i = 0; i < response.data.length; i++) {
//                     $('#gifArea').prepend("<img  src='" + response.data[i].images.fixed_height_still.url + "' >");
//                     $('#gifArea').prepend("<p>Rating: " + response.data[i].rating + "</p>");
//                     console.log(response);
//                 }
//             })

//     });
// }