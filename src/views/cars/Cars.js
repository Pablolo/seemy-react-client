import React, { Component } from "react";

import SearchBar from '../../components/SearchBar';
import LeanCarDetail from '../../components/LeanCarDetail';

import apiClient from '../../services/apiClient';

const STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

class Cars extends Component {
  state = {
    cars: [],
    error: undefined,
    status: STATUS.LOADING,
    searchQuery: ''
  }

  componentDidMount = () => {
    apiClient
    .cars()
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

  search = (e) => {
    this.setState({
      searchQuery: e.target.value,
    })
  }

  searchFilterRendering = () => {
    const { cars, searchQuery } = this.state;
    const includes = (car) => car.carSpecs.make.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (searchQuery === '') {
      return cars.map((car, index) => {
        return <LeanCarDetail key={index} car={car}/>
      })
    } else if (searchQuery !== '') {
      return cars.map((car, index) => {
        if(includes(car)) {
          return <LeanCarDetail key={index} car={car}/>
        }
      })
    } 
  }

  render() {
    const { status, error } = this.state;
    switch (status) {
      case STATUS.LOADING:
        return <div>Loading...</div>
      case STATUS.LOADED:
        return <div>
                <SearchBar searchQuery={this.search} />
                <h1>Cars Page</h1>
                {this.searchFilterRendering()}
              </div>
      case STATUS.ERROR:
        return <div>{error}</div>
    }
  }
}

export default Cars;