import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LeanCarDetail extends Component {
  render() {
    const { car } = this.props;
    return (
      <div className="flex">
        <Link to={`/cars/${car._id}`}>
          <div className="relative bg-red-300">
            <img
              className="w-11/12 my-8 mx-auto rounded"
              src={process.env.REACT_APP_BACKEND_URI + car.image}
              alt={car.make}
            />
            <p className="absolute bottom-0 border-4 border-solid border-gray-600 bg-white">
              <b>{car.dailyPrice}€</b>/day
            </p>
          </div>
          <p className="my-8 mx-auto bg-gray-600">
            {car.make} {car.model} {car.year}
          </p>
        </Link>
      </div>
    );
  }
}

LeanCarDetail.propTypes = {
  car: PropTypes.object,
};

export default LeanCarDetail;
