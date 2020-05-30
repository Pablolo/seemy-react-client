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
        <form className="w-11/12 bg-gray-100 my-6 mx-auto border border-gray-400 rounded text-center" onSubmit={this.handleSubmit}>
          <h2 className="text-xl font-bold text-left mt-8 mb-4 ml-4">Where is your car located?</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="streetAdress">
              Street Adress
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="streetAdress"
              id="streetAdress"
              placeholder="Street Adress"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="postalCode"
              id="postalCode"
              placeholder="Postal Code"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="city">
              City
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="province">
              Province
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="province"
              id="province"
              placeholder="Province"
              onChange={this.handleChange}
            />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Details</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="make">
              Make
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="make"
              id="make"
              placeholder="Make"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="model">
              Model
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="model"
              id="model"
              placeholder="Model"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="year">
              Year
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="year"
              id="year"
              placeholder="Year"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="odometer">
              Odometer
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="odometer"
              id="odometer"
              placeholder="Odometer"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="licensePlate">
              License Plate Number
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="licensePlate"
              id="licensePlate"
              placeholder="License Plate"
              onChange={this.handleChange}
            />{' '}
            <p className="text-left ml-12 text-xs mb-2">(This will not be public)</p>
          </div>
          <label className="block w-4/5 my-0 mx-auto text-left">Transmission</label>
          <div className="ml-12 flex flex-row">
            <div className="flex flex-row mr-5 items-center">
              <input type="radio" id="manual" name="transmission" value="manual" onChange={this.handleChange} />
              <label className="ml-2" htmlFor="manual">
                Manual
              </label>
            </div>
            <div className="flex flex-row items-center">
              <input type="radio" id="automatic" name="transmission" value="automatic" onChange={this.handleChange} />
              <label className="ml-2" htmlFor="automatic">
                Automatic
              </label>
            </div>
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Photos</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="image">
              Photo
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="image"
              id="image"
              placeholder="Image URL"
              onChange={this.handleChange}
            />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Car Availability</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="advanceNoticeHours">
              Advance Notice (Hours)
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="advanceNoticeHours"
              id="advanceNoticeHours"
              placeholder="Hours"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="maxDurationDays">
              Max. Booking Duration (Days)
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="maxDurationDays"
              id="maxDurationDays"
              placeholder="Days"
              onChange={this.handleChange}
            />
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Desired Price</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="dailyPrice">
              Daily Renting Price (in Euros)
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="dailyPrice"
              id="dailyPrice"
              placeholder="Price in €"
              onChange={this.handleChange}
            />{' '}
          </div>
          <h2 className="text-xl font-bold text-left mt-4 mb-2 ml-4">Description</h2>
          <div className="flex flex-col">
            <label className="w-4/5 my-0 mx-auto text-left" htmlFor="description">
              Describe your Vehicle
            </label>
            <textarea
              className="shadow appearance-none border rounded my-0 mx-auto w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              id="description"
              placeholder="Write here..."
              onChange={this.handleChange}
            />
          </div>
          <input
            className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/5 my-8 mx-auto cursor-pointer"
            type="submit"
            value="Publish Your Car Now"
          />
        </form>
        <p className="text-center text-gray-500 text-xs mb-20">&copy;2020 Seemy. All rights reserved.</p>
      </div>
    );
  }
}

export default withAuth(AddCar);
