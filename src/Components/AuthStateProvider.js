import React, { useState } from "react";

const AuthStateContext = React.createContext([{}, () => {}]);

const AuthStateProvider = props => {
  const [authState, setAuthState] = useState({
    userId: undefined,
    userName: undefined,
    userPhoto: undefined,
  });

  return (
    <AuthStateContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const [authState, setAuthState] = React.useContext(AuthStateContext)
  return [authState, setAuthState]
}

export { AuthStateProvider, AuthStateContext, useAuthState };
