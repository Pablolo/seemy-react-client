import React, { Component } from 'react';
import BookingForm from '../../components/BookingForm';

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
  
  cardetail = () => {
    const { car } = this.state;
    return  <div>
              <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.carSpecs.make + car.carSpecs.model}/>
              <p>{car.carSpecs.make} {car.carSpecs.model}</p>
              <div>
                <p>Year {car.carSpecs.year}</p>
                <p>{car.transmission} Transmission</p>
              </div>
              <div>
                <p>{car.dailyPrice}€/day</p>
                <BookingForm />
              </div>
              <p>Hosted by</p>
              <div>
                <img src={process.env.REACT_APP_BACKEND_URI + '/images/misc/default-avatar.png'} alt=""/>
                <p>{car.owner}</p>
              </div>
              <p>{car.description}</p>
            </div>
  }
  
  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Each Car Detail</h1>
                {this.cardetail()}
               </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default CarDetails;