import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Footer from "./Footer";
import Landing from "./Landing";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/app">
          <App />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
