import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarDetail from '../../components/CarDetail';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

import apiClient from '../../services/apiClient';

import './CarDetails.css';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

class CarDetails extends Component {
  state = {
    car: null,
    error: undefined,
    status: STATUS.LOADING,
  };

  componentDidMount = () => {
    const carId = this.props.match.params.id;
    apiClient
      .uniqueCar(carId)
      .then(response => {
        this.setState({
          car: response.data,
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
    const { status, error, car } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div className="cardetails-page">
            <h1 className="cardetails-h1">Each Car Detail</h1>
            <CarDetail car={car} />
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

CarDetails.propTypes = {
  match: PropTypes.object,
};

export default CarDetails;
