import React, { Component } from "react";
import axios from 'axios';

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
    axios.get(`${process.env.REACT_APP_BACKEND_URI}/cars`)
    .then((response) => {
      console.log(response.data);
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
    const { Cars } = this.state;
    return Cars.map((car, index) => {
      return 
    })
  }

  render() {
    const { cars, status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Choose your Car</h1>
                {this.listCars}
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default Cars;