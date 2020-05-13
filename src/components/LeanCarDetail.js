import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeanCarDetail extends Component {
  render() {
    const {car, index} = this.props;
    return (
      <Link key={index} to={`/cars/${car._id}`}> 
        <div>
          <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.carSpecs.make + car.carSpecs.model}/>
          <p>{car.carSpecs.make} {car.carSpecs.model} {car.carSpecs.year}</p>
          <p>{car.dailyPrice}€/day</p>
        </div>
      </Link>
    );
  }
}

export default LeanCarDetail;