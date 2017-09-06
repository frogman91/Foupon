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
        var newAPI = 'AIzaSyDcvNrflCgCWKKMnOXp4q8gcDNAftiSPew';
        //proxy url for the class
        var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';
        //Get current City value
        var place = $("#city-input").val().trim();
        //the url for google places
        var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+searchValue+ 'in+' + place + '&key=' + newAPI;

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
          //Heade Func
          var newHeader = function() { return  $('<h3 id="resultName">').text(responseArray[i].name)};
          //Create Img Func
          var newImage = function() { return $('<img />', {src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
            + response.data.results[i].photos[0].photo_reference + '&key=AIzaSyDcvNrflCgCWKKMnOXp4q8gcDNAftiSPew' })};
          //Create Address P Func
          var newAddress = function() { return $('<p id="resultAddress">').text(responseArray[i].formatted_address)};
          //Create Rating P Func
          var newRating = function() { return $('<p id="resultRating">').text('Rating: ' + responseArray[i].rating)};

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
                      //Step through Response Array Results
                            i ++;
                            /////Update restaurantDiv
                            //Update Name Header
                            restaurantDiv.html(newHeader());
                            //Update Image
                            restaurantDiv.append(newImage());
                            //Prepend Address
                            restaurantDiv.append(newAddress());
                            //Prepend Result Restaurant Rating
                            restaurantDiv.append(newRating());
                      });
                                // restaurantDiv.append(newHeader);

        //Closes AJAX Done Function
        });
        $("#restaurantDiv").show();
        $("#dislikeButton").show();
        $("#likeButton").show();
        $("#searchbar").css("margin", "10px 0 25px 0");
  //Closes Search Button Function
  });
