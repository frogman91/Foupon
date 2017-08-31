


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHL1gUv1RYc-YWV1zK72UDW29r1lVV1K4",
    authDomain: "foupon-6c9dd.firebaseapp.com",
    databaseURL: "https://foupon-6c9dd.firebaseio.com",
    projectId: "foupon-6c9dd",
    storageBucket: "foupon-6c9dd.appspot.com",
    messagingSenderId: "774072237770"
  };
  firebase.initializeApp(config);

  // Get ELements
  var txtEmail = document.getElementById("txtEmail");
  var txtPassword = document.getElementById("txtPassword");
  var btnLogin = document.getElementById("btnLogin");
  var btnSignUp = document.getElementById("btnSignUp");
  var btnLogout = document.getElementById("btnLogout");

  // add login event
  btnLogin.addEventListener("click", e => {
    // get email and pass
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    //  sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // add signup event
  btnSignUp.addEventListener("click", e => {
    // get email an pass
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    //  sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener("click", e => {
    firebase.auth().signOut()
  })

  // add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove("hide");

    } else {
      console.log("not logged in");
      btnLogout.classList.add("hide");
    }
  });
