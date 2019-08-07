import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.out.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthStateProvider } from "./Components/AuthStateProvider";

ReactDOM.render(
  <Router>
    <AuthStateProvider>
      <App />
    </AuthStateProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
