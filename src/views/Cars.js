import React, { Component } from "react";

import Search from '../components/SearchBar';

class Cars extends Component {

  listCars = () => {
    const { cars } = this.props;
    console.log(cars);
    return cars.map((car, index) => {
      return <div key={index}>
        <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.carSpecs.make + car.carSpecs.model}/>
        <p>{car.carSpecs.make} {car.carSpecs.model} {car.carSpecs.year}</p>
        <p>{car.dailyPrice}€/day</p>
      </div>
    })
  }

  render() {
    return (
      <div>
        <Search />
        <h1>Cars Page</h1>
        {this.listCars()}
      </div>
    );
  }
}

export default Cars;