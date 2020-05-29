import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookingForm from './BookingForm';

class CarDetails extends Component {
  transmissionUpperCase = () => {
    const { car } = this.props;
    return car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1);
  };

  render() {
    const { car } = this.props;
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
        <div className="border border-black mx-6 flex justify-between py-4 px-8">
          <p className="font-bold">Year {car.year}</p>
          <p className="font-bold">{this.transmissionUpperCase()} Transmission</p>
        </div>
        <div className="text-center border border-black mx-6 my-8 flex-col justify-between py-4 px-8">
          <p className="text-2xl text-left ml-2">
            <b className="font-extrabold text-3xl">{car.dailyPrice}€</b>/day
          </p>
          <BookingForm />
        </div>
        <p className="mx-auto text-lg font-bold ml-6">Hosted by</p>
        <Link className="flex ml-6 my-6" to={`/driver/${car.owner}`}>
          <img className="ml-8" src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/default-avatar.png`} alt="" />
          <p className="ml-8 font-bold text-lg py-4">Pablo Olóndriz</p>
        </Link>
        <p className="mx-auto text-lg font-bold ml-6 mb-4">Description</p>
        <p className="border border-black mx-6 flex justify-between py-4 px-8 mb-12">{car.description}</p>
      </div>
    );
  }
}

CarDetails.propTypes = {
  car: PropTypes.object,
};

export default CarDetails;
