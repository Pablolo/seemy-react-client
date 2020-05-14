import React, { Component } from 'react';

class DriverProfile extends Component {
  render() {
    console.log('driver page props', this.props)
    return (
      <div>
        <h1>Driver Profile</h1>
        Your id is...
      </div>
    );
  }
}

export default DriverProfile;