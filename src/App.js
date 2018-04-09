import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../public/images/otolb.png';

import './App.css';
import Login from '../components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
              <Route exact path="/Login" Component={Login} />
          </div>
      </Router>
      </div>
    );
  }
}

export default App;
