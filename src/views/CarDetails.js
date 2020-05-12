import React, { Component } from 'react';
import BookingForm from '../components/BookingForm';

class CarDetails extends Component {
  
  cardetail = () => {
    const { cars } = this.props;
    console.log(cars);
    const carId = this.props.match.params.id;
    return cars.map((car, index) => {
      if (car._id === carId) {
        return <div key={index}>
          <img src={process.env.REACT_APP_BACKEND_URI + car.image} alt={car.carSpecs.make + car.carSpecs.model}/>
          <p>{car.carSpecs.make} {car.carSpecs.model}</p>
          <div>
            <p>Year {car.carSpecs.year}</p>
            <p>{car.transmission} Transmission</p>
          </div>
          <div>
            <p>{car.dailyPrice}€/day</p>
            <BookingForm />
          </div>
          <p>Hosted by</p>
          <div>
            <img src={process.env.REACT_APP_BACKEND_URI + '/images/misc/default-avatar.png'} alt=""/>
            <p>{car.owner}</p>
          </div>
          <p>{car.description}</p>
        </div>
      }
    })
  }
  
  render() {
    return (
      <div>
        <h1>Each Car Detail</h1>
        {this.cardetail()}
      </div>
    );
  }
}

export default CarDetails;