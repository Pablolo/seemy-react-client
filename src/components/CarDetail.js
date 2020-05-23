import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookingForm from './BookingForm';

class CarDetails extends Component {
  render() {
    const { car } = this.props;
    return (
      <div>
        <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.make + car.model}/>
        <p>
          {car.make} {car.model}
        </p>
        <div>
          <p>Year {car.year}</p>
          <p>{car.transmission} Transmission</p>
        </div>
        <div>
          <p>{car.dailyPrice}€/day</p>
          <BookingForm />
        </div>
        <p>Hosted by</p>
        <div>
          <img src={process.env.REACT_APP_BACKEND_URI + '/images/misc/default-avatar.png'} alt="" />
          <Link to={`/driver/${car.owner}`}>View Owner Profile</Link>
        </div>
        <p>{car.description}</p>
      </div>
    );
  }
}

CarDetails.propTypes = {
  car: PropTypes.object,
};

export default CarDetails;