import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends Component {
  search = e => {
    this.props.searchQuery(e);
  };

  render() {
    return (
      <div className="bg-gray-300 pt-6 pb-8">
        <div className="flex justify-center items-center">
          <span className="w-auto flex justify-end items-center text-gray-500">
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
        <button className="mt-0 mx-auto bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow">
          See More Filters
        </button>
      </div>
    );
  }
}

export default SearchBar;
