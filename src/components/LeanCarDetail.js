import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LeanCarDetail extends Component {
  render() {
    const { car } = this.props;
    return (
      <div className="flex bg-white border border-4 bg-gray-200 rounded-md w-11/12 my-0 mx-auto mb-6">
        <Link to={`/cars/${car._id}`}>
          <div className="relative">
            <img className="mx-auto rounded" src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.make} />
            <p className="absolute bottom-0 right-0 mr-4 mb-3 rounded-sm p-2 bg-white">
              <b>{car.dailyPrice}€</b>/day
            </p>
          </div>
          <p className="mt-4 mb-4 mx-auto font-bold text-2xl ml-6 text-left">
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
