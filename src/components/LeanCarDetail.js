import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../Styles/components/LeanCarDetail.css';

class LeanCarDetail extends Component {
  render() {
    const { car } = this.props;
    return (
      <div className="leancar-wrapper">
        <Link className="leancar-link" to={`/cars/${car._id}`}>
          <div className="leancar-img-container">
            <img className="leancar-img" src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.make} />
            <p className="price-tag-img">
              <b>{car.dailyPrice}€</b>/day
            </p>
          </div>
          <p className="leancar-name">
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
