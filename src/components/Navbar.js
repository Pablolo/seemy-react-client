import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../context/authContext';

import '../Styles/components/Navbar.css';
import '../Styles/buttons.css';

class Navbar extends Component {
  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <nav className="navbar">
        <NavLink to="/" className="seemy-logo">
          seemy
        </NavLink>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <NavLink to={'/cars'} className="navlink">
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink to={'/learn-more'} className="navlink">
              Learn More
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink to={'/signup'} className="navlink">
                Sign Up
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to={'/login'} className="navlink">
                Log In
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to={`/driver/${user._id}`} className="navlink">
                Your Profile
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to={'/cars/add'} className="navlink">
              <button className="nav-btn">List Your Car</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

export default withAuth(Navbar);
