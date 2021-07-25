import React, { useState } from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from './screens/auth/Login'
import Authenticate from './screens/auth/Authenticate'
import Register from './screens/auth/Register'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Loading from "./screens/Loading";
import axios from "axios";
import { GuardProvider, GuardedRoute } from 'react-router-guards';


axios.defaults.baseURL = "https://api-todolist.safwan-azman.ml/";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});


const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("auth_token")) {
      next();
    }
    next.redirect('/');
  } else {
    next();
  }
};

function App() {
  return (
    <Router>
      <Switch>
        <GuardProvider guards={[requireLogin]} loading={Loading}>
          <GuardedRoute path="/" exact component={Login} />
          <GuardedRoute path="/Register" exact component={Register} />
          <GuardedRoute path="/Authenticate" exact component={Authenticate} />
          <GuardedRoute path="/Home" exact component={Home} meta={{ auth: true }} />
          <GuardedRoute path="/Profile" exact component={Profile} meta={{ auth: true }} />
        </GuardProvider>
      </Switch>
    </Router>
  );
}

export default App;
