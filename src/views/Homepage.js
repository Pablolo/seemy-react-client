import React, { Component } from 'react';

import LeanCarDetail from '../components/LeanCarDetail';
import Loading from '../components/Loading';
import Error from '../components/Error';

import apiClient from '../services/apiClient';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

class Homepage extends Component {
  state = {
    cars: null,
    error: undefined,
    status: STATUS.LOADING,
  };

  componentDidMount = () => {
    apiClient
      .cars()
      .then(response => {
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        const threeCars = shuffled.slice(0, 3);
        this.setState({
          cars: threeCars,
          status: STATUS.LOADED,
        });
      })
      .catch(error => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  listCars = () => {
    const { cars } = this.state;
    return cars.map((car, index) => {
      return <LeanCarDetail key={index} car={car} />;
    });
  };

  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div className="absolute mt-24">
            <h1 className="text-2xl font-bold text-center my-8">Cars Available Today</h1>
            {this.listCars()}
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

export default Homepage;
