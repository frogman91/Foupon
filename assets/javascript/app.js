//Define Variables

var newHeader; 
var newImage;
var newAddress; 
var newRating;

// On Search Button Click

function init() {
  $("#restaurantDiv").hide();
  $("#dislikeButton").hide();
  $("#likeButton").hide();
}
init();

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
          //Define Counter Variable
          var i = 0;
          // Define Restaurant Info Div
          var restaurantDiv = $('#restaurantDiv');
          //Build DIV Content Functions to Update with the counter variable
          //Heade Function
           newHeader = function() { return  $('<h3 id="resultName">').text(responseArray[i].name)};
          //Create Img Func
           newImage = function() { return $('<img />', {src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + responseArray[i].photos[0].photo_reference + '&key=' + ricardoAPI })};
          //Create Address P Func
           newAddress = function() { return $('<p id="resultAddress">').text(responseArray[i].formatted_address)};
          //Create Rating P Func
           newRating = function() { return $('<p id="resultRating">').text('Rating: ' + responseArray[i].rating)};

          //Set Data Attributes To Like Button for Info Storage in order to push to firebase
          $("#likeButton").data("name", responseArray[i].name);
          $("#likeButton").data("address", responseArray[i].formatted_address);
          $("#likeButton").data("rating", responseArray[i].rating);


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
                      $("#likeButton").data("name", responseArray[i].name);
                      $("#likeButton").data("address", responseArray[i].formatted_address);
                      $("#likeButton").data("rating", responseArray[i].rating);
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

                          } else {
                            alert("ran out of coupons");
                          }

                      });


                  // On Button Like Click, Query For Coupons With Same Parameters as Original Search
                  $('#likeButton').on('click', function(){
                    var likeButtonData = $(this).attr("data-coupon");
                    console.log(likeButtonData);
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
                                if (couponArray[j].deal.short_title.toLowerCase().match(responseArray[i].name.toLowerCase()))
                                console.log('YES');
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

 // //Define Divs for Profile Page of Liked Restaurant/Food and Applicble Coupons
                        // var profileRowDiv = $('<div class="newRow"></div>');
                        // console.log('IS function BEING NOTICED====', newHeader())
                        // var restResultDiv = $('<div class="restResultInfo   col-lg-6 col-md-6"></div>');
                        // var groupResultDiv = $('<div class="groupResultInfo col-lg-6 col-md-6"></div>');
                        // //Create new Row for Liked Restaurant/Food and Applicable Coupons
                        // $('#profile-result').append(profileRowDiv);
                        // //Enter Restaurant Info
                        // $('.newRow').append(restResultDiv);
                        // restResultDiv.html(newHeader());
                        // restResultDiv.append(newAddress());
                        // restResultDiv.append(newRating());
