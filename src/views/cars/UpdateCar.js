import React, { Component } from 'react';

import { withAuth } from "../../context/authContext";

import apiClient from '../../services/apiClient';

class UpdateCar extends Component {
  render() {
    return (
      <div>
        Updating Car
      </div>
    );
  }
}

export default withAuth(UpdateCar);