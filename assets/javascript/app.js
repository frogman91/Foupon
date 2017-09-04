$("#submitButton").on("click", function(e) {
        e.preventDefault();

        //value from search-input
        var searchValue = $("#search-input").val().trim();

        //your API key
        var newAPI = 'AIzaSyDfIrwEUZ0uUeJT2hDf9mK5ISRRT2einag';

        //proxy url for the class
        var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';

        //the url for google places
        var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+searchValue+'&key=' + newAPI;

        $.ajax({
            url: apiURL,
            method: 'POST',
            data: {
                'url': queryURL
            }
        }).done(function(response) {
            var res = JSON.stringify(response);
            console.log('AJAX RESPONSE =',response.data.results.length);
            for (var i = 0; i < response.data.results.length; i++) {
              //Build Image URL from search results
                    var newImage = $('<img />', {src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + response.data.results[i].photos[i].photo_reference +  '&key=AIzaSyDfIrwEUZ0uUeJT2hDf9mK5ISRRT2einag'});
                    $("#restaurantImg").text(response.data.results[i]);
                    //Prepend Result Restaurant Rating
                    console.log('RESTAURANT RATING: ',response.data.results[i].rating);
                    $('#restaurantImg').prepend("<p>Rating: " + response.data.results[i].rating + "</p>");
                    //Prepend 1st Image
                    $('#restaurantImg').prepend(newImage);
                }
        });
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
