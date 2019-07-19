import firebase from "./firebase";
import "firebase/auth";

let setAuthState = () => {};

const updateSignedInUser = (user) => {
  if(user) {
    setAuthState({
      userId: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    });
  } else {
    setAuthState({ userId: undefined, userName: undefined, userPhoto: undefined});
  }
}

const setupAuth = (setAuthStateFunc) => {
  setAuthState = setAuthStateFunc;
  firebase.auth().onAuthStateChanged(user => {
    updateSignedInUser(user);
  });
};

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const user = await firebase.auth().signInWithRedirect(provider);
  // TODO: Should handle/log errors here
  updateSignedInUser(user);
};

const signOut = async () => {
  await firebase.auth().signOut();
}

export { setupAuth, signIn, signOut };