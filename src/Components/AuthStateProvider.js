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

export { AuthStateProvider, AuthStateContext };
