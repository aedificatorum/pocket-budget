import React, { useEffect, useContext } from "react";
import { setupAuth } from "./Components/Auth";
import { AuthStateContext } from "./Components/AuthStateProvider";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  accentOne: "#f6ad55",
  accentTwo: "#feebc8",
  textNormal: "#2d3748",
  textInverse: "#ffffff"
};

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.textNormal};
  }
`;

const App = () => {
  const [authState, setAuthState] = useContext(AuthStateContext);

  useEffect(() => {
    setupAuth(setAuthState);
    // When using inMemory calling signIn() here will skip the login step
    // signIn();
  }, [setAuthState]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {!authState.userId ? <Login /> : <Home />}
      </ThemeProvider>
    </>
  );
};

export default App;
