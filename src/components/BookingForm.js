import React, { Component } from 'react';

class BookingForm extends Component {
  todaysDate = addDays => {
    const current = new Date();
    current.setDate(current.getDate() + addDays);
    const date = current.toISOString().substr(0, 10);
    return date;
  };

  render() {
    return (
      <div className="mt-4 mb-2">
        <div className="text-left my-0 mx-auto w-48 ml-2">
          <p className="text-gray-800 font-bold mb-2 text-left mt-2 mx-auto">Booking Start</p>
          <input className="mb-4 border border-gray-600 br rounded-sm" type="date" value={this.todaysDate(1)}></input>
          <p className="text-gray-800 font-bold mb-2 text-left mx-auto">Booking End</p>
          <input className="border border-gray-600 br rounded-sm" type="date" value={this.todaysDate(2)}></input>
        </div>
        <button className="mt-6 my-0 mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded">
          Checkout Now
        </button>
      </div>
    );
  }
}

export default BookingForm;
