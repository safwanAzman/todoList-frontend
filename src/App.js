import React, { useState } from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import Home from './screens/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Home" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
