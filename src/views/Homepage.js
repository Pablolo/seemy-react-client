import React, { Component } from 'react';

import Search from '../components/SearchBar';
import LeanCarDetail from '../components/LeanCarDetail';

import apiClient from '../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class Homepage extends Component {
  state = {
    cars: null,
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    apiClient
    .cars()
    .then((response) => {
      const shuffled = response.data.sort(() => 0.5 - Math.random());
      let threeCars = shuffled.slice(0, 3);
      this.setState({
        cars: threeCars,
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
      return <LeanCarDetail key={index} car={car} />
    })
  }

  render() {
    console.log('homepage props', this.props)
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <Search />
                <h1>Homepage</h1>
                {this.listCars()}
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    };
  }
}

export default Homepage;