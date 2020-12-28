import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthStateProvider } from "./Components/AuthStateProvider";
import { NavMenuItemsProvider } from "./Components/Provider/NavMenuItemsContext";

ReactDOM.render(
  <NavMenuItemsProvider>
    <Router>
      <AuthStateProvider>
        <App />
      </AuthStateProvider>
    </Router>
  </NavMenuItemsProvider>,
  document.getElementById("root")
);