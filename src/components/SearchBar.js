import React, { Component } from 'react';

class SearchBar extends Component {

  search = (e) => {
    this.props.searchQuery(e);
  }

  render() {
    return (
      <div>
        <input className='search-bar' placeholder={'Search here...'} type="text" onChange={this.search}/><br/>
      </div>
    );
  }
}

export default SearchBar;