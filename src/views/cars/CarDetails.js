import React, { Component } from 'react';
import CarDetail from '../../components/CarDetail';

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class CarDetails extends Component {
  state = {
    car: null,
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    const carId = this.props.match.params.id;
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
 
  render() {
    const { status, error, car } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Each Car Detail</h1>
                <CarDetail car={car}/>
               </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default CarDetails;