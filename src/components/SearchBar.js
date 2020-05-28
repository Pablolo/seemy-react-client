import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends Component {
  search = e => {
    this.props.searchQuery(e);
  };

  render() {
    return (
      <div className="bg-white p-4 flex justify-center items-center">
        <span className="w-auto flex justify-end items-center text-gray-500 p-2">
          <i className="ml-12 absolute">
            <SearchIcon color="action" fontSize="large" />
          </i>
        </span>
        <input
          className="my-8 px-12 py-2 border-2 border-gray-600 rounded"
          placeholder={"Try to search 'Ferrari'..."}
          type="text"
          onChange={this.search}
        />
      </div>
    );
  }
}

export default SearchBar;
