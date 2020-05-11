import React, { Component } from 'react';

import NavBar from '../components/Navbar';
import Search from '../components/SearchBar';

class Homepage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Search />
      </div>
    );
  }
}

export default Homepage;