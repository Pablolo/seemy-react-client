import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withAuth } from '../../context/authContext';
import apiClient from '../../services/apiClient';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import LeanCarDetail from '../../components/LeanCarDetail';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

class DriverProfile extends Component {
  state = {
    cars: undefined,
    user: undefined,
    error: undefined,
    status: STATUS.LOADING,
    match: false,
  };

  getAxiosData = () => {
    const userId = this.props.match.params.id;
    apiClient
      .getUserCars(userId)
      .then(response => {
        this.setState({
          cars: response.data.carDestructured,
          user: response.data.user,
          status: STATUS.LOADED,
        });
      })
      .then(() => {
        const { user } = this.state;
        const loggedUser = this.props.user._id;
        if (user._id === loggedUser) {
          this.setState({
            match: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  componentDidMount = () => {
    this.getAxiosData();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getAxiosData();
    }
  }

  showUserCars = () => {
    const { cars, match } = this.state;
    if (typeof cars === undefined) {
      return <div>No cars published yet!</div>;
    }
    if (Array.isArray(cars)) {
      return cars.map((car, index) => {
        return (
          <div className="bg-gray-100 w-5/6 my-6 mx-auto border border-gray-400 rounded text-center py-6" key={index}>
            <LeanCarDetail car={car} />
            {match && (
              <Link to={`/cars/${car._id}/update`}>
                <button className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded w-1/2 cursor-pointer">Update Car Details</button>
              </Link>
            )}
          </div>
        );
      });
    }
    if (typeof cars === 'object') {
      return (
        <div>
          <LeanCarDetail car={cars} />
          {match && (
            <Link to={`/cars/${cars._id}/update`}>
              <button>Update Car Details</button>
            </Link>
          )}
        </div>
      );
    }
  };

  render() {
    const { onLogout } = this.props;
    const { status, error, cars, user, match } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div className="absolute mt-24">
            <div className="bg-gray-100 w-5/6 my-6 mx-auto border border-gray-400 rounded text-center">
              <img
                className="h-auto w-2/5 rounded-full mx-auto mt-6"
                src={process.env.REACT_APP_BACKEND_URI + user.profilePhoto}
                alt={user.firstName}
              />
              <p className="text-2xl font-bold text-center mt-2 mb-2">
                {user.firstName} {user.lastName}
              </p>
              {match && <p className="text-lg text-center mb-2">{user.email}</p>}
              {match && (
                <button
                  className="bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 mt-4 mb-8 cursor-pointer"
                  onClick={onLogout}
                >
                  Logout
                </button>
              )}
            </div>
            {match && !cars && (
              <Link to={'/cars/add'}>
                <button>List Your Car</button>
              </Link>
            )}
            {match && cars && (
              <div className="text-centerflex flex-col">
                <h2 className="text-2xl font-bold text-center mt-2 mb-8">Your Published Cars</h2>
                <p className="mb-8 px-20 text-center">
                  Click on each car to see your publication or click on the button to edit
                </p>
              </div>
            )}
            {!match && cars && (
              <div>
                <h2 className="text-2xl font-bold text-center mt-2 mb-8">{user.firstName}&apos;s Published Cars</h2>
                <p className="mb-8 px-20 text-center">Click on each car to see its details or book it!</p>
              </div>
            )}
            <div>{this.showUserCars()}</div>
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

DriverProfile.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
};

export default withAuth(DriverProfile);
