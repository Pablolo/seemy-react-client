import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookingForm from './BookingForm';

import Loading from './Loading';
import Error from './Error';

import apiClient from '../services/apiClient';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

class CarDetails extends Component {
  state = {
    user: '',
    error: undefined,
    status: STATUS.LOADING,
  };

  transmissionUpperCase = () => {
    const { car } = this.props;
    return car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1);
  };

  componentDidMount = () => {
    const userId = this.props.car.owner;
    apiClient
      .getUserCars(userId)
      .then(response => {
        this.setState({
          user: response.data.user,
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

  render() {
    const { car } = this.props;
    const { user, error, status } = this.state;
    console.log(user.profilePhoto);
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div>
            <img
              className="w-11/12 mx-auto rounded"
              src={process.env.REACT_APP_BACKEND_URI + car.image}
              alt={car.make + car.model}
            />
            <p className="mt-2 mb-8 mx-auto font-bold text-3xl ml-6">
              {car.make} {car.model}
            </p>
            <div className="bg-gray-300 mx-6 flex justify-between py-4 px-8 rounded">
              <p className="font-bold">Year {car.year}</p>
              <p className="font-bold">{this.transmissionUpperCase()} Transmission</p>
            </div>
            <div className="rounded bg-gray-200 text-center border-2 border-black mx-6 my-8 flex-col justify-between py-4 px-8">
              <p className="text-2xl text-left ml-2">
                <b className="font-extrabold text-3xl">{car.dailyPrice}€</b>/day
              </p>
              <BookingForm />
            </div>
            <p className="mx-auto text-lg font-bold ml-6">Hosted by</p>
            <Link className="flex ml-6 my-6" to={`/driver/${car.owner}`}>
              <img
                className="ml-8 rounded-full h-24 w-24 flex items-center justify-center border-2 border-black"
                src={`${process.env.REACT_APP_BACKEND_URI}${user.profilePhoto}`}
                alt="userimg"
              />
              <p className="ml-8 font-bold text-xl py-4 mt-4">
                {user.firstName} {user.lastName}
              </p>
            </Link>
            <p className="mx-auto text-lg font-bold ml-6 mb-4">Description</p>
            <p className="bg-gray-300 mx-6 flex justify-between py-4 px-8 mb-12 rounded">{car.description}</p>
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

CarDetails.propTypes = {
  car: PropTypes.object,
};

export default CarDetails;
