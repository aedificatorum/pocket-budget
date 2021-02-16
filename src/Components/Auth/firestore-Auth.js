import Auth from "firebase-auth-lite";

const auth = new Auth({
  apiKey: "AIzaSyD9CBg8CS9XHEH5ipIJMOIIWL7wAHecctk",
  redirectUri: window.location.origin,
});
auth.handleSignInRedirect();

let setAuthState = () => {};

const updateSignedInUser = (user) => {
  if (user) {
    setAuthState({
      userId: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    });
  } else {
    setAuthState({
      userId: undefined,
      userName: undefined,
      userPhoto: undefined,
    });
  }
};

const setupAuth = (setAuthStateFunc) => {
  setAuthState = setAuthStateFunc;
  auth.listen((user) => {
    updateSignedInUser(user);
  });
};

const signIn = async () => {
  await auth.signInWithProvider(`google.com`);
};

const signOut = async () => {
  await auth.signOut();
};

export { setupAuth, signIn, signOut };
