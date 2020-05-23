import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class UpdateCar extends Component {
  state = {
    car: null,
    error: undefined,
    status: STATUS.LOADING,
    personLoggedIn: '',
    match: undefined,
  };

  componentDidMount = () => {
    const carId = this.props.match.params.id;
    if (this.props.user !== null) {
      this.setState({
        personLoggedIn: this.props.user._id
      })
    }
    apiClient
    .uniqueCar(carId)
    .then((response) => {
      this.setState({
        car: response.data,
        status: STATUS.LOADED,
      })
    })
    .then(() => {
      const { car, personLoggedIn } = this.state;
      if (car.owner === personLoggedIn) {
        this.setState({
          match: true,
        })
      }
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }

  handleChange = (e) => {
    const { car } = { ...this.state };
    const currentState = car;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ car: currentState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const carId = this.props.match.params.id;
    const { car } = this.state;
    const { history } = this.props;
    apiClient
      .updateCar(carId, car) 
      .then((res) => {
        history.push(`/cars/${carId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    const { personLoggedIn } = this.state;
    const { history } = this.props;
    apiClient
      .deleteCar(id)
      .then(() => {
        history.push(`/driver/${personLoggedIn}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { car, status, error, match } = this.state;
    const carId = this.props.match.params.id;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                { !match && 
                  <div>
                    <h1>You're not allowed here</h1> 
                    <Link to={'/'}><button>Return to the Homepage</button></Link>
                  </div>  
                }
                { match &&
                  <div> 
                    <h1>Update your Car Details and Price</h1>
                    <form onSubmit={this.handleSubmit}>
                      <h2>Where is your car located?</h2>
                      <label htmlFor="streetAdress">Street Adress</label>
                      <input
                        type="text"
                        name="streetAdress"
                        id="streetAdress"
                        defaultValue={car.streetAdress}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="postalCode">Postal Code</label>
                      <input
                        type="number"
                        name="postalCode"
                        id="postalCode"
                        defaultValue={car.postalCode}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={car.city}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="province">Province</label>
                      <input
                        type="text"
                        name="province"
                        id="province"
                        defaultValue={car.province}
                        onChange={this.handleChange}
                      />
                      <h2>Car Details</h2>
                      <label htmlFor="make">Make</label>
                      <input
                        type="text"
                        name="make"
                        id="make"
                        defaultValue={car.make}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="model">Model</label>
                      <input
                        type="text"
                        name="model"
                        id="model"
                        defaultValue={car.model}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="year">Year</label>
                      <input
                        type="number"
                        name="year"
                        id="year"
                        defaultValue={car.year}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="odometer">Odometer</label>
                      <input
                        type="number"
                        name="odometer"
                        id="odometer"
                        defaultValue={car.odometer}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="licensePlate">License Plate Number</label>
                      <input
                        type="text"
                        name="licensePlate"
                        id="licensePlate"
                        defaultValue={car.licensePlate}
                        onChange={this.handleChange}
                      /> (this will not be public)
                      <input 
                        type="radio" 
                        id="manual" 
                        name="transmission" 
                        value="manual" 
                        checked={car.transmission === "manual"}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="manual">Manual</label>
                      <input 
                        type="radio" 
                        id="automatic" 
                        name="transmission" 
                        value="automatic" 
                        checked={car.transmission === "automatic"}
                        onChange={this.handleChange}             
                      />
                      <label htmlFor="automatic">Automatic</label>
                      <h2>Car Photos</h2>
                      <label htmlFor="image">Photo</label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        defaultValue={car.image}
                        onChange={this.handleChange}
                      />
                      <h2>Car Availability</h2>
                      <label htmlFor="advanceNoticeHours">Advance Notice (Hours)</label>
                      <input
                        type="number"
                        name="advanceNoticeHours"
                        id="advanceNoticeHours"
                        defaultValue={car.advanceNoticeHours}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="maxDurationDays">Max. Booking Duration (Days)</label>
                      <input
                        type="number"
                        name="maxDurationDays"
                        id="maxDurationDays"
                        defaultValue={car.maxDurationDays}
                        onChange={this.handleChange}
                      />
                      <h2>Desired Price</h2>
                      <label htmlFor="dailyPrice">Daily Renting Price</label>
                      <input
                        type="number"
                        name="dailyPrice"
                        id="dailyPrice"
                        defaultValue={car.dailyPrice}
                        onChange={this.handleChange}
                      /> euros
                      <h2>Description</h2>
                      <label htmlFor="description">Describe your Vehicle</label>
                      <textarea
                        name="description"
                        id="description"
                        defaultValue={car.description}
                        onChange={this.handleChange}
                      />
                      <br/><br/>
                      <input type="submit" value="Update" />
                    </form>
                    <button
                      onClick={(e) => {
                        this.handleDelete(carId);
                      }}
                    >
                      Delete Car
                    </button>
                  </div>  
                }
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default withAuth(UpdateCar);