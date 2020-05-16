import React, { Component } from 'react';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class UpdateCar extends Component {
  state = {
    // streetAdress: '',
    // city: '',
    // province: '',
    // postalCode: '',
    // year: '',
    // make: '',
    // model: '',
    // odometer: '',
    // advanceNoticeHours: '',
    // maxDurationDays: '',
    // transmission: '',
    // image: '',
    // description: '',
    // licensePlate: '',
    // dailyPrice: '',
    // owner: '',
    car: null,
    error: undefined,
    status: STATUS.LOADING,
    personLoggedIn: '',
    match: undefined,
  };

  componentDidMount = () => {
    const carId = this.props.match.params.id;
    if (this.props.user !== null) {
      this.setState({
        personLoggedIn: this.props.user.data._id
      })
    }
    apiClient
    .uniqueCar(carId)
    .then((response) => {
      this.setState({
        car: response.data,
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

  isMatch = () => {
    const { car, personLoggedIn } = this.state;
    if (car.owner === personLoggedIn) {
      this.setState({
        match: true,
      })
    }
  }

  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Update your Car Details and Price</h1>
                {/* {this.isMatch()} */}
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default withAuth(UpdateCar);