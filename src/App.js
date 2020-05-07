import React, { Component } from 'react';
import { Switch, Link } from 'react-router-dom';

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Protected from "./views/Protected";
import LoginWithAuth from './views/Login';
import SignupWithAuth from './views/Signup';

import AuthProvider from './context/authContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>Signup</Link>
          <Switch>
            <AnonRoute exact path={'/login'} component={LoginWithAuth}/>
            <AnonRoute exact path={'/signup'} component={SignupWithAuth}/>
            <PrivateRoute exact path={"/protected"} component={Protected} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
