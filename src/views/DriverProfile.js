import React, { Component } from 'react';

import { withAuth } from "../context/authContext";

class DriverProfile extends Component {
  render() {
    console.log('driver page props', this.props)
    const { onLogout } = this.props;
    return (
      <div>
        <h1>Driver Profile</h1>
        Your id is...
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(DriverProfile);