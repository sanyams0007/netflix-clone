import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';
import Landing from './Landing';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>

        <Route path='/app'>
          <App />
          <Footer />
        </Route>

        <Route path='/'>
          <Landing />
        </Route>

      </Switch>


    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
