import React, { Component } from 'react';

import { withAuth } from '../../context/authContext';

import AddUpdateCarForm from '../../components/AddUpdateCarForm';

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
      <AddUpdateCarForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        pageTitle={'List Your Car'}
        streetPlaceholder={'Street Adress'}
        zipPlaceholder={'Postal Code'}
        cityPlaceholder={'City'}
        provincePlaceholder={'Province'}
        makePlaceholder={'Make'}
        modelPlaceholder={'Model'}
        yearPlaceholder={'Year'}
        odometerPlaceholder={'Odometer'}
        licensePlatePlaceholder={'License Plate'}
        imgPlaceholder={'Image URL'}
        hoursPlaceholder={'Hours'}
        daysPlaceholder={'Days'}
        pricePlaceholder={'Price in €'}
        descriptionPlaceholder={'Write here...'}
        submitBtn={'Publish Your Car Now'}
        submitStyles={'bg-orange-600 hover:bg-orange-700'}
      />
    );
  }
}

export default withAuth(AddCar);
