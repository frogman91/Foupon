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
          var newHeader = function() { return  $('<h3>').text(responseArray[i].name)};
          //Create Img Func
          var newImage = function() { return $('<img />', {src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + responseArray[i].photos[0].photo_reference + '&key=' + newAPI })};
          //Create Address P Func
          var newAddress = function() { return $('<p>').text(responseArray[i].formatted_address)};
          //Create Rating P Func
          var newRating = function() { return $('<p>').text('Rating ' + responseArray[i].rating)};

          //////// Append to DIV
          //Append Name
          restaurantDiv.append(newHeader);
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
                  
                  $('#likeButton').on('click', function(){
                    console.log('TRACK INDEX POSITION===', i);


                  })

        //Closes AJAX Done Function
        });
  //Closes Search Button Function
  });








// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAHL1gUv1RYc-YWV1zK72UDW29r1lVV1K4",
//     authDomain: "foupon-6c9dd.firebaseapp.com",
//     databaseURL: "https://foupon-6c9dd.firebaseio.com",
//     projectId: "foupon-6c9dd",
//     storageBucket: "foupon-6c9dd.appspot.com",
//     messagingSenderId: "774072237770"
//   };
//   firebase.initializeApp(config);


//   // Get ELements
//   var inputEmail = document.getElementById("inputEmail");
//   var inputPassword = document.getElementById("inputPassword");
//   var btnLogin = document.getElementById("add-user");
//   var btnSignUp = document.getElementById("btnSignUp");
//   var btnLogout = document.getElementById("btnLogout");

//   // add login event
//   btnLogin.addEventListener("click", e => {
//     // get email and pass
//     var email = inputEmail.value;
//     var pass = inputPassword.value;
//     var auth = firebase.auth();
//     //  sign in
//     var promise = auth.signInWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));
//   });

//   // add signup event
//   // btnSignUp.addEventListener("click", e => {
//   //   // get email an pass
//   //   var email = inputEmail.value;
//   //   var pass = inputPassword.value;
//   //   var auth = firebase.auth();
//   //   //  sign in
//     // var promise = auth.createUserWithEmailAndPassword(email, pass);

//   //   promise.catch(e => console.log(e.message));
//   // });

//   // btnLogout.addEventListener("click", e => {
//   //   firebase.auth().signOut()
//   // })

//   // add a realtime listener
//   firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//       console.log(firebaseUser);
//       btnLogout.classList.remove("hide");

//     // } else {
//     //   console.log("not logged in");
//     //   btnLogout.classList.add("hide");
//     }
//   });




//   