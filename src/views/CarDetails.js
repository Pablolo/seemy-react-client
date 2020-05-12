import React, { Component } from 'react';

class CarDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Each Car Detail</h1>
      </div>
    );
  }
}

export default CarDetails;