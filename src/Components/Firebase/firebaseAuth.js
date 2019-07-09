import firebase from "./firebase";

//TODO: Auth should provide some access to the signed in user
const setupAuth = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token);
        console.log(user);
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.warn(errorCode, errorMessage, email, credential);
      });
    } else {
      console.log(user);
    }
  })
};

export { setupAuth };