import React, { Component } from "react";

import Search from '../../components/SearchBar';
import LeanCarDetail from '../../components/LeanCarDetail';

import apiClient from '../../services/apiClient';

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
      return <LeanCarDetail car={car} index={index}/>
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