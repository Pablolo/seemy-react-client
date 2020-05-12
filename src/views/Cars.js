import React, { Component } from "react";
import { Link } from "react-router-dom";

import Search from '../components/SearchBar';

import apiClient from '../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class Cars extends Component {
  state = {
    cars: [],
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    apiClient
    .cars()
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

  listCars = () => {
    const { cars } = this.state;
    return cars.map((car, index) => {
      return <Link key={index} to={`/cars/${car._id}`}> 
                <div>
                  <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.carSpecs.make + car.carSpecs.model}/>
                  <p>{car.carSpecs.make} {car.carSpecs.model} {car.carSpecs.year}</p>
                  <p>{car.dailyPrice}€/day</p>
                </div>
              </Link>
    })
  }

  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <Search />
                <h1>Cars Page</h1>
                {this.listCars()}
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default Cars;