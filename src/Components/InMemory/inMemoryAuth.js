let setAuthState = () => {};

const setupAuth = (setAuthStateFunc) => {
  setAuthState = setAuthStateFunc;
};

const signIn = () => {
  setAuthState({
    userId: 123,
    userName: "Test User"
  });
};

const signOut = () => {
  setAuthState({
    userId: undefined,
    userName: undefined,
    userPhoto: undefined,
  });
}

export { setupAuth, signIn, signOut };