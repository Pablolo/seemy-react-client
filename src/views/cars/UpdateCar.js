import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class UpdateCar extends Component {
  state = {
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
    .then(() => {
      const { car, personLoggedIn } = this.state;
      if (car.owner === personLoggedIn) {
        this.setState({
          match: true,
        })
      }
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }

  render() {
    const { status, error, match } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                { !match && 
                  <div>
                    <h1>You're not allowed here</h1> 
                    <Link to={'/'}><button>Return to the Homepage</button></Link>
                  </div>  
                }
                { match &&
                  <div> 
                    <h1>Update your Car Details and Price</h1>
                  </div>  
                }
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default withAuth(UpdateCar);