import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LeanCarDetail extends Component {
  render() {
    const { car } = this.props;
    return (
      <div className="flex">
        <Link to={`/cars/${car._id}`}>
          <div className="relative">
            <img
              className="w-11/12 mx-auto rounded"
              src={process.env.REACT_APP_BACKEND_URI + car.image}
              alt={car.make}
            />
            <p className="absolute bottom-0 right-0 mr-8 mb-3 rounded-sm p-2 bg-white">
              <b>{car.dailyPrice}€</b>/day
            </p>
          </div>
          <p className="mt-2 mb-8 mx-auto font-bold text-2xl ml-6">
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
