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
  const context = React.useContext(AuthStateContext)
  if(context === undefined) {
    throw new Error("useAuthState must be nested under an AuthStateProvider")
  }

  return context[0]
}

const useSetAuthState = () => {
  const context = React.useContext(AuthStateContext)
  if(context === undefined) {
    throw new Error("useAuthState must be nested under an AuthStateProvider")
  }

  return context[1]
} 

export { AuthStateProvider, useAuthState, useSetAuthState };
