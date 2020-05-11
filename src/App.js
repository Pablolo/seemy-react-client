import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Homepage from './views/Homepage';
import Protected from "./views/Protected";
import LoginWithAuth from './views/Login';
import SignupWithAuth from './views/Signup';
import Cars from './views/Cars';

import AuthProvider from './context/authContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <Homepage />
          <Switch>
            <Route exact path={'/cars'} component={Cars} />
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
