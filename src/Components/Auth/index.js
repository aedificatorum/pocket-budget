import {
  setupAuth as firestore_setupAuth,
  signIn as firestore_signIn,
  signOut as firestore_signOut
} from "./firebaseAuth";

import {
  setupAuth as memory_setupAuth,
  signIn as memory_signIn,
  signOut as memory_signOut
} from "./inMemoryAuth";

const setupAuth = process.env.REACT_APP_MEMORY
  ? memory_setupAuth
  : firestore_setupAuth;
const signIn = process.env.REACT_APP_MEMORY ? memory_signIn : firestore_signIn;
const signOut = process.env.REACT_APP_MEMORY
  ? memory_signOut
  : firestore_signOut;

export { setupAuth, signIn, signOut };
