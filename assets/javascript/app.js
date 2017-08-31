(function() {


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
  const txt Email = document.getElementById("txtEmail");
  const txt Password = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");

  // add login event
  btnLogin.addEventListener("click", e => {
    // get email an pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //  sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  })


