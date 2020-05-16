import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeanCarDetail extends Component {
  render() {
    const { car } = this.props;
    return (
      <Link to={`/cars/${car._id}`}> 
        <div>
          <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.make}/>
          <p>{car.make} {car.model} {car.year}</p>
          <p>{car.dailyPrice}€/day</p>
        </div>
      </Link>
    );
  }
}

export default LeanCarDetail;