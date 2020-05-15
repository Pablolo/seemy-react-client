import React, { Component } from 'react';

import { withAuth } from "../context/authContext";
import apiClient from '../services/apiClient';

import LeanCarDetail from '../components/LeanCarDetail';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class DriverProfile extends Component {
  state = {
    cars: null,
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    const userId = this.props.match.params.id;
    apiClient
    .getUserCars(userId)
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

  showUserCars = () => {
    const { cars } = this.state;
    return cars.map((car, index) => {
      return <LeanCarDetail key={index} car={car}/>
    })
  }

  render() {
    const { onLogout, user } = this.props;
    const { status, error, cars } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Driver Profile</h1>
                <div>
                  <img src={process.env.REACT_APP_BACKEND_URI + user.data.profilePhoto} alt=""/>
                  <p>{user.data.firstName} {user.data.lastName}</p>
                  <p>{user.data.email}</p> 
                </div>
                <button onClick={onLogout}>Logout</button>
                { cars && <div>
                  <h2>Your Published Cars</h2> 
                  <p>Click on each car to edit its details or price</p>
                  {this.showUserCars()}
                </div> }
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default withAuth(DriverProfile);