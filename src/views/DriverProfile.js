import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from "../context/authContext";
import apiClient from '../services/apiClient';

import LeanCarDetail from '../components/LeanCarDetail';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class DriverProfile extends Component {
  state = {
    cars: null,
    error: undefined,
    status: STATUS.LOADING,
  }

  componentDidMount = () => {
    const userId = this.props.match.params.id;
    apiClient
    .getUserCars(userId)
    .then((response) => {
      this.setState({
        cars: response.data,
        status: STATUS.LOADED,
      })
    })
    .catch((error) => {
      this.setState({
        error: error.name,
        status: STATUS.ERROR,
      })
    })
  }

  showUserCars = () => {
    const { cars } = this.state;
    return cars.map((car, index) => {
      return <div key={index}>
               <LeanCarDetail car={car}/>
               <Link to={`/cars/${car._id}/update`}><button>Update Car Details</button></Link>
             </div>
    })
  }

  render() {
    const { onLogout, user } = this.props;
    console.log('logged user props', this.props)
    const { status, error, cars } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <h1>Driver Profile</h1>
                <div>
                  <img src={process.env.REACT_APP_BACKEND_URI + user.data.profilePhoto} alt={user.data.firstName}/>
                  <p>{user.data.firstName} {user.data.lastName}</p>
                  <p>{user.data.email}</p> 
                </div>
                <button onClick={onLogout}>Logout</button>
                { !cars && <Link to={'/cars/add'}><button>List Your Car</button></Link>}
                { cars && <div>
                  <h2>Your Published Cars</h2> 
                  <p>Click on each car to see your publication live or click on the button to edit</p>
                  {this.showUserCars()}
                </div> }
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
      // no default
    }
  }
}

export default withAuth(DriverProfile);