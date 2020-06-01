import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../../context/authContext';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
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
        personLoggedIn: this.props.user._id,
      });
    }
    apiClient
      .uniqueCar(carId)
      .then(response => {
        this.setState({
          car: response.data,
          status: STATUS.LOADED,
        });
      })
      .then(() => {
        const { car, personLoggedIn } = this.state;
        if (car.owner === personLoggedIn) {
          this.setState({
            match: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  handleChange = e => {
    const { car } = { ...this.state };
    const currentState = car;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ car: currentState });
  };

  handleSubmit = e => {
    e.preventDefault();
    const carId = this.props.match.params.id;
    const { car } = this.state;
    const { history } = this.props;
    apiClient
      .updateCar(carId, car)
      .then(res => {
        history.push(`/cars/${carId}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDelete = id => {
    const { personLoggedIn } = this.state;
    const { history } = this.props;
    apiClient
      .deleteCar(id)
      .then(() => {
        history.push(`/driver/${personLoggedIn}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { car, status, error, match } = this.state;
    const carId = this.props.match.params.id;
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div>
            {!match && (
              <div className="absolute mt-24 w-full">
                <h1 className="text-2xl font-bold text-center my-8">You&apos;re not allowed here</h1>
                <Link to={'/'}>
                  <button className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/5 my-8 mx-auto cursor-pointer">
                    Return to the Homepage
                  </button>
                </Link>
              </div>
            )}
            {match && (
              <div className="absolute mt-24 w-full text-center">
                <h1 className="text-2xl font-bold text-center my-8 px-20">Update your Car Details and Price</h1>
                <form
                  className="w-11/12 bg-gray-100 my-6 mx-auto border border-gray-400 rounded text-center"
                  onSubmit={this.handleSubmit}
                >
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Where is your car located?</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="streetAdress">
                      Street Adress
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="streetAdress"
                      id="streetAdress"
                      defaultValue={car.streetAdress}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="postalCode">
                      Postal Code
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="postalCode"
                      id="postalCode"
                      defaultValue={car.postalCode}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="city">
                      City
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={car.city}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="province">
                      Province
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="province"
                      id="province"
                      defaultValue={car.province}
                      onChange={this.handleChange}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Car Details</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="make">
                      Make
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="make"
                      id="make"
                      defaultValue={car.make}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="model">
                      Model
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="model"
                      id="model"
                      defaultValue={car.model}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="year">
                      Year
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="year"
                      id="year"
                      defaultValue={car.year}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="odometer">
                      Odometer
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="odometer"
                      id="odometer"
                      defaultValue={car.odometer}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="licensePlate">
                      License Plate Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="licensePlate"
                      id="licensePlate"
                      defaultValue={car.licensePlate}
                      onChange={this.handleChange}
                    />{' '}
                    <p className="text-left ml-12 text-xs mb-2">(This will not be public)</p>
                  </div>
                  <input
                    type="radio"
                    id="manual"
                    name="transmission"
                    value="manual"
                    checked={car.transmission === 'manual'}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="manual">Manual</label>
                  <input
                    type="radio"
                    id="automatic"
                    name="transmission"
                    value="automatic"
                    checked={car.transmission === 'automatic'}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="automatic">Automatic</label>
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Car Photos</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="image">
                      Photo
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="image"
                      id="image"
                      defaultValue={car.image}
                      onChange={this.handleChange}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Car Availability</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="advanceNoticeHours">
                      Advance Notice (Hours)
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="advanceNoticeHours"
                      id="advanceNoticeHours"
                      defaultValue={car.advanceNoticeHours}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="maxDurationDays">
                      Max. Booking Duration (Days)
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="maxDurationDays"
                      id="maxDurationDays"
                      defaultValue={car.maxDurationDays}
                      onChange={this.handleChange}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Desired Price</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="dailyPrice">
                      Daily Renting Price (in Euros)
                    </label>
                    <input
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="dailyPrice"
                      id="dailyPrice"
                      defaultValue={car.dailyPrice}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Description</h2>
                  <div className="flex flex-col">
                    <label className="w-4/5 my-0 mx-auto text-left" htmlFor="description">
                      Describe your Vehicle
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="description"
                      id="description"
                      defaultValue={car.description}
                      onChange={this.handleChange}
                    />
                  </div>
                  <input
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-4/5 my-8 mx-auto cursor-pointer"
                    type="submit"
                    value="Update Car"
                  />
                </form>
                <p className="font-bold">You can Delete your car here:</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 mt-4 mb-4 mx-auto cursor-pointer"
                  onClick={e => {
                    this.handleDelete(carId);
                  }}
                >
                  Delete Car
                </button>
                <p className="text-center text-gray-700 text-sm mb-20 px-20">
                  Warning! This will permanently delete your car from Seemy
                </p>
              </div>
            )}
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

UpdateCar.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
};

export default withAuth(UpdateCar);
