  // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    
    var email = "";
    
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      
      // Grabbed values from text-boxes
        email = $("#inputEmail").val().trim();
                  
      // Code for "Setting values in the database"
      database.ref().set({
        
        email: email,
         
      });

    });

    // Firebase watcher + initial loader 
    database.ref().on("value", function(snapshot) {

      // Logging everything that's coming out of snapshot
      console.log(snapshot.val());
      
      console.log(snapshot.val().email);
      
      

      // Changing the HTML to reflect
      
      $("#email-display").html(snapshot.val().email);
      
      

      // Handle errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });