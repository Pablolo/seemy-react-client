/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';

import HomePage from './views/Homepage';
import LoginWithAuth from './views/auth/Login';
import SignupWithAuth from './views/auth/Signup';
import Cars from './views/cars/Cars';
import CarDetails from './views/cars/CarDetails';
import UpdateCar from './views/cars/UpdateCar';
import AddCar from './views/cars/AddCar';
import LearnMore from './views/info/LearnMore';
import DriverProfile from './views/driver/DriverProfile';

import AuthProvider from './context/authContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path={'/cars'} component={Cars} />
            <PrivateRoute exact path={'/cars/add'} component={AddCar} />
            <Route exact path={'/cars/:id'} component={CarDetails} />
            <Route exact path={'/cars/:id/update'} component={UpdateCar} />
            <Route exact path={'/learn-more'} component={LearnMore} />
            <AnonRoute exact path={'/login'} component={LoginWithAuth} />
            <AnonRoute exact path={'/signup'} component={SignupWithAuth} />
            <PrivateRoute exact path={'/driver/:id'} component={DriverProfile} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
