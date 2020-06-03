import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../../context/authContext';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AddUpdateCarForm from '../../components/AddUpdateCarForm';

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
              <AddUpdateCarForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                pageTitle={'Update your Car Details and Price'}
                streetDefaultValue={car.streetAdress}
                zipDefaultValue={car.postalCode}
                cityDefaultValue={car.city}
                provinceDefaultValue={car.province}
                makeDefaultValue={car.make}
                modelDefaultValue={car.model}
                yearDefaultValue={car.year}
                odometerDefaultValue={car.odometer}
                licensePlateDefaultValue={car.licensePlate}
                manualTransmission={car.transmission === 'manual'}
                automaticTransmission={car.transmission === 'automatic'}
                imgDefaultValue={car.image}
                hoursDefaultValue={car.advanceNoticeHours}
                daysDefaultValue={car.maxDurationDays}
                priceDefaultValue={car.dailyPrice}
                descriptionDefaultValue={car.description}
                submitBtn={'Update Car'}
                submitStyles={'bg-purple-600 hover:bg-purple-700'}
                deleteCar={
                  <div className="text-center">
                    <p className="font-bold">You can Delete your car here:</p>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 mt-4 mb-4 mx-auto cursor-pointer"
                      onClick={e => {
                        this.handleDelete(carId);
                      }}
                    >
                      Delete Car
                    </button>
                    <p className="text-center text-gray-700 text-sm mb-8 px-20">
                      Warning! This will permanently delete your car from Seemy
                    </p>
                  </div>
                }
              />
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
