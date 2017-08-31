$("#addUser").on("click", Function(event) {
  event.preventDefault();
}


var userName, emailAddress, password;

// TODO: read these values from a form where the user entered them

var ref = new Firebase("https://www.gstatic.com/firebasejs/4.3.0/firebase.js");
ref.createUser({
  email    : emailAddress,
  password : password
}, function(error, authData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: userName
    });
  }
});cd 