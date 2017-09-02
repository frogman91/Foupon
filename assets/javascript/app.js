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
            $("#stuff").text(res);
            console.log(response);
        });
    });