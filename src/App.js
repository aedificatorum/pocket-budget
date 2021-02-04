import * as React from "react";
import { setupAuth } from "./Components/Auth";
import { useAuthState, useSetAuthState } from "./Components/Provider/AuthStateProvider"
import Login from "./Components/Login";
import Home from "./Components/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  accentOne: "#904e55",
  accentTwo: "#eadee0",
  textNormal: "#2d3748",
  textDark: "#252627",
  textInverse: "#ffffff",
  breakpoint: "640px",
};

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.textNormal};
  }
`;

const App = () => {
  const authState = useAuthState();
  const setAuthState = useSetAuthState();

  React.useEffect(() => {
    setupAuth(setAuthState);
  }, [setAuthState]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{!authState.userId ? <Login /> : <Home />}</ThemeProvider>
    </>
  );
};

export default App;
