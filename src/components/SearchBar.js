import React, { Component } from 'react';

import '../Styles/components/SearchBar.css';

class SearchBar extends Component {
  search = e => {
    this.props.searchQuery(e);
  };

  render() {
    return (
      <div className="searchBar-wrapper">
        <img className="search-icon" src={process.env.REACT_APP_BACKEND_URI + '/images/misc/magnifying-glass.png'} />
        <input className="searchBar" placeholder={'Search here...'} type="text" onChange={this.search} />
      </div>
    );
  }
}

export default SearchBar;
