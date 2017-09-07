  // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    
    var email = "";
    

    var userObject = {};


    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      
      // Grabbed values from html
        email = $("#inputEmail").val().trim();
    });
        
    // $("#likeButton").on("click", function(event) {
    //   event.preventDefault();

    //   // Grabbed like values
    //     likes = $("#newHeader").val().trim() 
                  
    //   // Code for "Setting values in the database"
    //   database.ref().set({
        
    //     email: email,
    //     likes: likes,
         
    //   });

    // });

    // Firebase watcher + initial loader 
    database.ref("/userLikes").on("child_added", function(snapshot) {

      // Logging everything that's coming out of snapshot
      console.log(snapshot.val());
      
      console.log(snapshot.val().userEmail);
      console.log(snapshot.val().liked);
      
      

      // Changing the HTML to reflect
      
      $("#email-display").html(snapshot.val().email);
      
      

      // Handle errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


  var btnLogout = document.getElementById("btnLogout");

  
  // when user signs up
  $("#add-user").on("click", function(e){
    e.preventDefault();
    var email = $("#inputEmail").val().trim();
    var pass = $("#inputPassword").val().trim();
    var auth = firebase.auth();
    //  sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

    // when user signs up
  $("#login-user").on("click", function(e){
    e.preventDefault();
    var email = $("#loginEmail").val().trim();
    var pass = $("#loginPassword").val().trim();
    var auth = firebase.auth();
    //  sign in
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });
  });

  $("#logout-user").on("click", function(e){
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("user was logged out");
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  })


  //check to see if the user is signed in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      userObject.email = user.email;
      userObject.uid = user.uid;

      // checking in the userLikes database 
      database.ref("/userLikes").on("child_added", function(snapshot){
        // if the email from the database matches the email from the 
        // logged in user
        if(snapshot.val().userEmail === userObject.email) {
          // show the user likes
          console.log('our user likes', snapshot.val().liked);
          console.log('our user likes', snapshot.val().address);
          console.log('our user likes', snapshot.val().rating);
        }
      })
    } else {
      // No user is signed in.
    }
  });

  //when the user click the like button 
  $("#likeButton").on("click", function(e){
    e.preventDefault();
    database.ref("/userLikes").push({
      userEmail: userObject.email, 
      userId: userObject.uid,
      liked: $("#likeButton").data("name"),
      address: $("#likeButton").data("address"),
      rating: $("#likeButton").data("rating")

    }); 
  })
  // it saves the like to the database 
  // and is tied back the user 