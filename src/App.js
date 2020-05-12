import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';

import HomePage from './views/Homepage';
import Protected from "./views/Protected";
import LoginWithAuth from './views/Login';
import SignupWithAuth from './views/Signup';
import Cars from './views/Cars';
import CarDetails from './views/CarDetails';
import ListYourCar from './views/ListYourCar';
import LearnMore from './views/LearnMore';

import AuthProvider from './context/authContext';

import './App.css';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class App extends Component {
  state = {
    cars: [],
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URI}/cars`)
    .then((response) => {
      this.setState({
        cars: response.data,
        status: STATUS.LOADED,
      })
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }

  render() {
    const { cars, status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <AuthProvider>
                <div>
                  <NavBar />
                  <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path={'/cars'} render={(props) => <Cars {...props} cars={cars}/>}/>
                    <Route exact path={'/cars/:id'} render={(props) => <CarDetails {...props} cars={cars}/>}/>
                    <Route exact path={'/learn-more'} component={LearnMore}/>
                    <PrivateRoute exact path={'/cars/add'} component={ListYourCar} />
                    <AnonRoute exact path={'/login'} component={LoginWithAuth}/>
                    <AnonRoute exact path={'/signup'} component={SignupWithAuth}/>
                    <PrivateRoute exact path={'/protected'} component={Protected} />
                  </Switch>
                </div>
              </AuthProvider>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default App;
