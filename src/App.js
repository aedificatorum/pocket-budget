import React, { useEffect, useContext } from "react";
import { setupAuth } from "./Components/Auth";
import { AuthStateContext } from "./Components/AuthStateProvider";
import Login from "./Components/Login";
import Home from "./Components/Home";

const App = () => {
  const [authState, setAuthState] = useContext(AuthStateContext);

  useEffect(() => {
    setupAuth(setAuthState);
    // When using inMemory calling signIn() here will skip the login step
    // signIn();
  }, [setAuthState]);

  return !authState.userId ? (
    <Login />
  ) : (
    <Home />
  );
};

export default App;
