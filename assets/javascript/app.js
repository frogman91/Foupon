// On Search Button Click

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
    var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + searchValue + 'in+' + place + '&key=' + newAPI;

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
        var newHeader = function() { return $('<h3>').text(responseArray[i].name) };
        //Create Img Func
        var newImage = function() { return $('<img />', { src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&height=400&photoreference=' + response.data.results[i].photos[0].photo_reference + '&key=' + newAPI }) };
        //Create Address P Func
        var newAddress = function() { return $('<p>').text(responseArray[i].formatted_address) };
        //Create Rating P Func
        var newRating = function() { return $('<p>').text('Rating ' + responseArray[i].rating) };

        //////// Append to DIV
        //Append Name
        restaurantDiv.append(newHeader);
        //Append 1st Image
        restaurantDiv.append(newImage);
        //Append Address
        restaurantDiv.append(newAddress);
        //Append Result Restaurant Rating
        restaurantDiv.append(newRating);
        

        var sqootAPI = 'GD6dkmwuVjt_Ia8tQSC8';
        
        var callBack = $("#search-input").val().trim();

        //http://api.sqoot.com/v2/deals?api_key=demo&callback=pickles
        var queryURL = 'http://api.sqoot.com/v2/deals?api_key=' + sqootAPI + '&query=' + callBack;
        console.log('queryURL ===', queryURL)

        $.ajax({
                'url': queryURL,
                method: "GET",
                header: {},
                parameters: {
                    location: "",
                    query: newHeader
                }
                // 'data' : parameterMap,
                // 'dataType' : 'jsonp',
                // 'async' : 'false',
                // 'cache': true,
            })
            .done(function(response) {
                console.log('sqoot: ' + response);
            })


        $('.decision').on('click', function() {
            //Step through Response Array Results
            i++;
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
    //Closes Search Button Function
});

