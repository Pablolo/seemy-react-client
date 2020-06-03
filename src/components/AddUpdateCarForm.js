import React, { Component } from 'react';

class AddUpdateCarForm extends Component {
  change = e => {
    this.props.handleChange(e);
  };

  submit = e => {
    this.props.handleSubmit(e);
  };

  render() {
    return (
      <div className="absolute mt-24 w-full">
        <h1 className="text-2xl font-bold text-center my-8">{this.props.pageTitle}</h1>
        <form
          className="w-11/12 bg-gray-100 my-6 mx-auto border border-gray-400 rounded text-center"
          onSubmit={this.submit}
        >
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
              placeholder={this.props.streetPlaceholder}
              defaultValue={this.props.streetDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.zipPlaceholder}
              defaultValue={this.props.zipDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.cityPlaceholder}
              defaultValue={this.props.cityDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.provincePlaceholder}
              defaultValue={this.props.provinceDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.makePlaceholder}
              defaultValue={this.props.makeDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.modelPlaceholder}
              defaultValue={this.props.modelDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.yearPlaceholder}
              defaultValue={this.props.yearDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.odometerPlaceholder}
              defaultValue={this.props.odometerDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.licensePlatePlaceholder}
              defaultValue={this.props.licensePlateDefaultValue}
              onChange={this.change}
            />{' '}
            <p className="text-left ml-12 text-xs mb-2">(This will not be public)</p>
          </div>
          <label className="block w-4/5 my-0 mx-auto text-left">Transmission</label>
          <div className="ml-12 flex flex-row">
            <div className="flex flex-row mr-5 items-center">
              <input
                type="radio"
                id="manual"
                name="transmission"
                value="manual"
                checked={this.props.manualTransmission}
                onChange={this.change}
              />
              <label className="ml-2" htmlFor="manual">
                Manual
              </label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="radio"
                id="automatic"
                name="transmission"
                value="automatic"
                checked={this.props.automaticTransmission}
                onChange={this.change}
              />
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
              placeholder={this.props.imgPlaceholder}
              defaultValue={this.props.imgDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.hoursPlaceholder}
              defaultValue={this.props.hoursDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.daysPlaceholder}
              defaultValue={this.props.daysDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.pricePlaceholder}
              defaultValue={this.props.priceDefaultValue}
              onChange={this.change}
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
              placeholder={this.props.descriptionPlaceholder}
              defaultValue={this.props.descriptionDefaultValue}
              onChange={this.change}
            />
          </div>
          <input
            className={`${this.props.submitStyles} text-white font-bold py-2 px-4 rounded w-4/5 my-8 mx-auto cursor-pointer`}
            type="submit"
            value={this.props.submitBtn}
          />
        </form>
        {this.props.deleteCar}
        <p className="text-center text-gray-500 text-xs mb-20">&copy;2020 Seemy. All rights reserved.</p>
      </div>
    );
  }
}

export default AddUpdateCarForm;
