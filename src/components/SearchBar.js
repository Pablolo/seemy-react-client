import React, { Component } from 'react';

import '../Styles/components/SearchBar.css';

class SearchBar extends Component {
  search = e => {
    this.props.searchQuery(e);
  };

  render() {
    return (
      <div className="searchBar-wrapper">
        <input className="searchBar" placeholder={'Search here...'} type="text" onChange={this.search} />
        <br />
      </div>
    );
  }
}

export default SearchBar;
