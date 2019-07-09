import firebase from "./firebase";

let setAuthState = () => {};

const updateSignedInUser = (user) => {
  if(user) {
    setAuthState({
      userId: user.email,
      userName: user.displayName
    });
  } else {
    setAuthState({ userId: undefined, userName: undefined });
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

export { setupAuth, signIn };