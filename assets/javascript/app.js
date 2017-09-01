// $(document).ready(function() {
//     addStartingButtons();
// });
// $("button").click(function() {

//         var fired_button = $(this).val().trim();
//         event.preventDefault();
//         let queryURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJSx6SrQ9T2YARed8V_f0hOg0&type=restaurant" + "location" + "&key=AIzaSyDcvNrflCgCWKKMnOXp4q8gcDNAftiSPew"
//         $.ajax({ url: queryURL, method: 'GET' })
//             .done(function(response) {
                
//                     $('#gifArea').prepend("<img  src='" + response.data[i].images.fixed_height_still.url + "' >");
//                     $('#gifArea').prepend("<p>Rating: " + response.data[i].rating + "</p>");
//                     console.log(response);

