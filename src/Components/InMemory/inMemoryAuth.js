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

export { setupAuth, signIn };