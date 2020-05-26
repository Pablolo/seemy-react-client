import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../context/authContext';

import '../Styles/components/Navbar.css';
import '../Styles/buttons.css';

class Navbar extends Component {
  state = {
    showMenu: false,
  };

  showMenu = e => {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  render() {
    const { isLoggedIn, user } = this.props;
    const { showMenu } = this.state;
    return (
      <nav className="navbar">
        <NavLink to="/" className="seemy-logo">
          seemy
        </NavLink>
        <div>
          <img
            className="show-menu-img"
            onClick={this.showMenu}
            src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/user.png`}
            alt=""
          />
          {showMenu && (
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
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

export default withAuth(Navbar);
