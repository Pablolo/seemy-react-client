import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';

import HomePage from './views/Homepage';
import Protected from './views/auth/Protected';
import LoginWithAuth from './views/auth/Login';
import SignupWithAuth from './views/auth/Signup';
import Cars from './views/cars/Cars';
import CarDetails from './views/cars/CarDetails';
import UpdateCar from './views/cars/UpdateCar';
import ListYourCar from './views/cars/ListYourCar';
import LearnMore from './views/LearnMore';
import DriverProfile from './views/DriverProfile';

import AuthProvider from './context/authContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path={'/cars'} component={Cars}/>
            <PrivateRoute exact path={'/cars/add'} component={ListYourCar} />
            <Route exact path={'/cars/:id'} component={CarDetails}/>
            <Route exact path={'/cars/:id/update'} component={UpdateCar}/>
            <Route exact path={'/learn-more'} component={LearnMore}/>
            <AnonRoute exact path={'/login'} component={LoginWithAuth}/>
            <AnonRoute exact path={'/signup'} component={SignupWithAuth}/>
            <PrivateRoute exact path={'/driver/:id'} component={DriverProfile} />
            <PrivateRoute exact path={"/protected"} component={Protected} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
