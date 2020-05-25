import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../context/authContext';

import '../Styles/components/Navbar.css';

class Navbar extends Component {
  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <nav className="navbar">
        <Link to="/" className="seemy-logo">
          seemy
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link to={'/cars'}>Cars</Link>
          </li>
          <li>
            <Link to={'/learn-more'}>Learn More</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to={'/signup'}>Sign Up</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to={'/login'}>Log In</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to={`/driver/${user._id}`}>Your Profile</Link>
            </li>
          )}
          <li>
            <Link to={'/cars/add'}>
              <button>List Your Car</button>
            </Link>
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
