// initializes Firebase
var config = {
    apiKey: "AIzaSyAHL1gUv1RYc-YWV1zK72UDW29r1lVV1K4",
    authDomain: "foupon-6c9dd.firebaseapp.com",
    databaseURL: "https://foupon-6c9dd.firebaseio.com",
    projectId: "foupon-6c9dd",
    storageBucket: "foupon-6c9dd.appspot.com",
    messagingSenderId: "774072237770"
};
firebase.initializeApp(config);



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

// Firebase watcher + initial loader 
database.ref("/userLikes").on("child_added", function(snapshot) {

    // Changing the HTML to reflect

    $("#email-display").html(snapshot.val().email);

    // Handle errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

var btnLogout = document.getElementById("btnLogout");
var signedIn;

// when user signs up
$("#add-user").on("click", function(e) {
    e.preventDefault();
    var email = $("#inputEmail").val().trim();
    var password = $("#inputPassword").val().trim();

    //  sign in
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        window.location.href = 'main.html';
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
    });
});

// when user signs up
$("#login-user").on("click", function(e) {
    e.preventDefault();
    var email = $("#loginEmail").val().trim();
    var pass = $("#loginPassword").val().trim();
    var auth = firebase.auth();
    //  sign in
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function() {
        window.location.href = 'main.html';
    }).catch(function(error) {

        // Handle Errors here.
        console.log(error);
        // ...
    });

});

$("#logout").on("click", function(e) {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        
        
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
    window.location.href = 'index.html';
})

//check to see if the user is signed in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        userObject.email = user.email;
        userObject.uid = user.uid;

        $("#logout").html("<a id='logout' href='index.html'>Logout</a>")
        $("#spacer").removeClass("col-md-3 col-sm-3 col-xs-3");
        $("#spacer").addClass("col-md-4 col-sm-3 col-xs-1");
        $("#main-content").removeClass("col-md-6 col-sm-6 col-xs-6");
        $("#main-content").addClass("col-md-4 col-sm-6 col-xs-10");
        $("#welcome").hide();
        $(".form-signin").show();

    } else {
        // No user is signed in.
        $("#logout").html("<a id='login' href='index.html'>Login</a>");
        $("#tableThing").append("<h1 class='text-center' style='margin-bottom: 20px'> Your search results will appear here, go log in and get some searches!! </h1>");

    }
});

// checking in the userLikes database 
database.ref("/userLikes").on("child_added", function(snapshot) {
    // if the email from the database matches the email from the 
    // logged in user
    if (snapshot.val().userEmail === userObject.email) {
        // show the user likes

        $("#restResult").prepend("<tr><td>" + snapshot.val().liked + "</td><td>" + snapshot.val().address + "</td><td>" + snapshot.val().rating + "</td><td>" + snapshot.val().coupon + "</td></tr>");
    }
})

//when the user click the like button 
$("#likeButton").on("click", function(e) {
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