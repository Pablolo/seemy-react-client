import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <div className="absolute mt-4 text-center">
            <div
              className="bg-no-repeat bg-cover w-screen h-screen text-center flex-col content-between"
              style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URI}/images/misc/homepage-3.jpg)` }}
            >
              <div>
                <h1 className="text-5xl font-bold text-center mt-12 pt-16 px-12 text-white">
                  <span className="bg-black">RENT YOUR DREAM CAR</span>
                </h1>
                <h3 className="font-bold text-center mt-4 text-white">Book unforgettable cars from trusted hosts</h3>
              </div>
              <Link to={'/cars/'}>
                <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded shadow mt-64">
                  View Cars in Your Area
                </button>
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-center my-8">Cars Available Today</h2>
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
