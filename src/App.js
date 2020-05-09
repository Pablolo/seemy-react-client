import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';

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
          <NavBar />
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
