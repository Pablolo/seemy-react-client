import React, { Component } from 'react';

import { withAuth } from "../context/authContext";

class ListYourCar extends Component {
  state = {
    
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1>List your Car</h1>
        <form action=""></form>
      </div>
    );
  }
}

export default withAuth(ListYourCar);