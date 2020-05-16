import React, { Component } from 'react';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

class ListYourCar extends Component {
  state = {
    streetAdress: '',
    city: '',
    province: '',
    postalCode: '',
    year: '',
    make: '',
    model: '',
    odometer: '',
    advanceNoticeHours: '',
    maxDurationDays: '',
    transmission: '',
    image: '',
    description: '',
    licensePlate: '',
    dailyPrice: '',
    owner: '',
  };

  componentDidMount = () => {
    if (this.props.user !== null) {
      this.setState({
        owner: this.props.user._id
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const userId = this.props.user.data._id;
    const { streetAdress, 
            city, 
            province, 
            postalCode, 
            year, 
            make, 
            model, 
            odometer, 
            advanceNoticeHours, 
            maxDurationDays, 
            transmission,
            image,
            description,
            licensePlate,
            dailyPrice,
            owner
            } = this.state;
    apiClient
      .addCar({ 
          streetAdress, 
          city, 
          province, 
          postalCode, 
          year, 
          make, 
          model, 
          odometer, 
          advanceNoticeHours, 
          maxDurationDays, 
          transmission,
          image,
          description,
          licensePlate,
          dailyPrice,
          owner
       })
      .then((res) => {
        history.push(`/driver/${userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>List your Car</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Where is your car located?</h2>
          <label htmlFor="streetAdress">Street Adress</label>
          <input
            type="text"
            name="streetAdress"
            id="streetAdress"
            placeholder="Street Adress"
            onChange={this.handleChange}
          />
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="number"
            name="postalCode"
            id="postalCode"
            placeholder="Postal Code"
            onChange={this.handleChange}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            onChange={this.handleChange}
          />
          <label htmlFor="province">Province</label>
          <input
            type="text"
            name="province"
            id="province"
            placeholder="Province"
            onChange={this.handleChange}
          />
          <h2>Car Details</h2>
          <label htmlFor="make">Make</label>
          <input
            type="text"
            name="make"
            id="make"
            placeholder="Make"
            onChange={this.handleChange}
          />
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Model"
            onChange={this.handleChange}
          />
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="Year"
            onChange={this.handleChange}
          />
          <label htmlFor="odometer">Odometer</label>
          <input
            type="number"
            name="odometer"
            id="odometer"
            placeholder="Odometer"
            onChange={this.handleChange}
          />
           <label htmlFor="licensePlate">License Plate Number</label>
          <input
            type="text"
            name="licensePlate"
            id="licensePlate"
            placeholder="License Plate"
            onChange={this.handleChange}
          /> (this will not be public)
          <input 
            type="radio" 
            id="manual" 
            name="transmission" 
            value="manual" 
            onChange={this.handleChange}
          />
          <label htmlFor="manual">Manual</label>
          <input 
            type="radio" 
            id="automatic" 
            name="transmission" 
            value="automatic" 
            onChange={this.handleChange}             
          />
          <label htmlFor="automatic">Automatic</label>
          <h2>Car Photos</h2>
          <label htmlFor="image">Photo</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Image URL"
            onChange={this.handleChange}
          />
          <h2>Car Availability</h2>
          <label htmlFor="advanceNoticeHours">Advance Notice (Hours)</label>
          <input
            type="number"
            name="advanceNoticeHours"
            id="advanceNoticeHours"
            placeholder="Hours"
            onChange={this.handleChange}
          />
          <label htmlFor="maxDurationDays">Max. Booking Duration (Days)</label>
          <input
            type="number"
            name="maxDurationDays"
            id="maxDurationDays"
            placeholder="Days"
            onChange={this.handleChange}
          />
          <h2>Desired Price</h2>
          <label htmlFor="dailyPrice">Daily Renting Price</label>
          <input
            type="number"
            name="dailyPrice"
            id="dailyPrice"
            placeholder="Price"
            onChange={this.handleChange}
          /> euros
          <h2>Description</h2>
          <label htmlFor="description">Describe your Vehicle</label>
          <textarea
            name="description"
            id="description"
            placeholder="Write here..."
            onChange={this.handleChange}
          />
          <br/><br/>
          <input type="submit" value="Publish" />
        </form>
      </div>
    );
  }
}

export default withAuth(ListYourCar);