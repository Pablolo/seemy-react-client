import React, { Component } from 'react';

import { withAuth } from '../../context/authContext';

import apiClient from '../../services/apiClient';

class AddCar extends Component {
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
    this.setState({
      owner: this.props.user._id,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const userId = this.props.user._id;
    const {
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
      owner,
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
        owner,
      })
      .then(res => {
        history.push(`/driver/${userId}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="absolute mt-24 w-full">
        <h1 className="text-2xl font-bold text-center my-8">List your Car</h1>
        <form className="w-11/12 bg-gray-100 my-6 mx-auto border border-gray-400 rounded" onSubmit={this.handleSubmit}>
          <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Where is your car located?</h2>
          <div className="flex flex-col">
            <label className="w-11/12 my-0 mx-auto text-left" htmlFor="streetAdress">
              Street Adress
            </label>
            <input
              className="border border-gray-700 w-11/12 my-0 mx-auto rounded-sm mb-4"
              type="text"
              name="streetAdress"
              id="streetAdress"
              placeholder="Street Adress"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-11/12 my-0 mx-auto text-left" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              className="border border-gray-700 w-11/12 my-0 mx-auto rounded-sm mb-4"
              type="number"
              name="postalCode"
              id="postalCode"
              placeholder="Postal Code"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-11/12 my-0 mx-auto text-left" htmlFor="city">
              City
            </label>
            <input
              className="border border-gray-700 w-11/12 my-0 mx-auto rounded-sm mb-4"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-11/12 my-0 mx-auto text-left" htmlFor="province">
              Province
            </label>
            <input
              className="border border-gray-700 w-11/12 my-0 mx-auto rounded-sm mb-4"
              type="text"
              name="province"
              id="province"
              placeholder="Province"
              onChange={this.handleChange}
            />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Details</h2>
          <div className="flex flex-col">
            <label htmlFor="make">Make</label>
            <input
              className="border border-gray-700 w-11/12 my-0 mx-auto rounded-sm mb-4"
              type="text"
              name="make"
              id="make"
              placeholder="Make"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="model">Model</label>
            <input type="text" name="model" id="model" placeholder="Model" onChange={this.handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="year">Year</label>
            <input type="number" name="year" id="year" placeholder="Year" onChange={this.handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="odometer">Odometer</label>
            <input type="number" name="odometer" id="odometer" placeholder="Odometer" onChange={this.handleChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="licensePlate">License Plate Number</label>
            <input
              type="text"
              name="licensePlate"
              id="licensePlate"
              placeholder="License Plate"
              onChange={this.handleChange}
            />{' '}
            <p>(this will not be public)</p>
          </div>
          <input type="radio" id="manual" name="transmission" value="manual" onChange={this.handleChange} />
          <label htmlFor="manual">Manual</label>
          <input type="radio" id="automatic" name="transmission" value="automatic" onChange={this.handleChange} />
          <label htmlFor="automatic">Automatic</label>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Photos</h2>
          <div className="flex flex-col">
            <label htmlFor="image">Photo</label>
            <input type="text" name="image" id="image" placeholder="Image URL" onChange={this.handleChange} />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Availability</h2>
          <div className="flex flex-col">
            <label htmlFor="advanceNoticeHours">Advance Notice (Hours)</label>
            <input
              type="number"
              name="advanceNoticeHours"
              id="advanceNoticeHours"
              placeholder="Hours"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxDurationDays">Max. Booking Duration (Days)</label>
            <input
              type="number"
              name="maxDurationDays"
              id="maxDurationDays"
              placeholder="Days"
              onChange={this.handleChange}
            />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Desired Price</h2>
          <div className="flex flex-col">
            <label htmlFor="dailyPrice">Daily Renting Price</label>
            <input
              type="number"
              name="dailyPrice"
              id="dailyPrice"
              placeholder="Price"
              onChange={this.handleChange}
            />{' '}
            euros
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Description</h2>
          <div className="flex flex-col">
            <label htmlFor="description">Describe your Vehicle</label>
            <textarea name="description" id="description" placeholder="Write here..." onChange={this.handleChange} />
          </div>
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/3 my-4 mx-auto cursor-pointer"
            type="submit"
            value="Publish"
          />
        </form>
      </div>
    );
  }
}

export default withAuth(AddCar);
