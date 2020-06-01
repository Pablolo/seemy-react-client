import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar';
import LeanCarDetail from '../../components/LeanCarDetail';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

class Cars extends Component {
  state = {
    cars: [],
    error: undefined,
    status: STATUS.LOADING,
    searchQuery: '',
  };

  componentDidMount = () => {
    apiClient
      .cars()
      .then(response => {
        this.setState({
          cars: response.data,
          status: STATUS.LOADED,
        });
      })
      .catch(error => {
        this.setState({
          error: error.name,
          status: STATUS.ERROR,
        });
      });
  };

  search = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  searchFilterRendering = () => {
    const { cars, searchQuery } = this.state;
    const carsUpdated = cars.map(car => {
      car.fullName = `${car.make} ${car.model} ${car.year}`;
      return car;
    });
    if (searchQuery === '') {
      return cars.map((car, index) => {
        return <LeanCarDetail key={index} car={car} />;
      });
    }
    if (searchQuery !== '') {
      return carsUpdated.map((car, index) => {
        if (car.fullName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return <LeanCarDetail key={index} car={car} />;
        }
      });
    }
  };

  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <Loading />;
      case STATUS.LOADED:
        return (
          <div className="absolute mt-24">
            <SearchBar searchQuery={this.search} />
            <h1 className="text-2xl font-bold text-center mt-2 mb-8">Available Supercars</h1>
            {this.searchFilterRendering()}
          </div>
        );
      case STATUS.ERROR:
        return <Error error={error} />;
      // no default
    }
  }
}

export default Cars;
