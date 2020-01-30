let setAuthState = () => {};

const setupAuth = setAuthStateFunc => {
  setAuthState = setAuthStateFunc;
  // This speeds up development by not having to reload
  signIn();
};

const signIn = () => {
  setAuthState({
    userId: 123,
    userName: "Test User",
    userPhoto:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
  });
};

const signOut = () => {
  setAuthState({
    userId: undefined,
    userName: undefined,
    userPhoto: undefined
  });
};

export { setupAuth, signIn, signOut };
