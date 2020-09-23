import React, { useEffect, useContext } from "react";
import { setupAuth } from "./Components/Auth";
import { AuthStateContext } from "./Components/AuthStateProvider";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { IntlProvider } from "react-intl";

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
  const [authState, setAuthState] = useContext(AuthStateContext);

  useEffect(() => {
    setupAuth(setAuthState);
  }, [setAuthState]);

  return (
    <>
      <GlobalStyle />
      <IntlProvider locale="EN">
        <ThemeProvider theme={theme}>{!authState.userId ? <Login /> : <Home />}</ThemeProvider>
      </IntlProvider>
    </>
  );
};

export default App;
