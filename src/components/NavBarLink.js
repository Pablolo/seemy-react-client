import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavBarLink extends Component {
  render() {
    const { to, name, addcss } = this.props;
    return (
      <NavLink to={to}>
        <li className={`hover:bg-gray-300 px-12 py-3 ${addcss}`}>{name}</li>
      </NavLink>
    );
  }
}

NavBarLink.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  addcss: PropTypes.string,
};

export default NavBarLink;
