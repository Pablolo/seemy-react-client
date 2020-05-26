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
      <div>
        <nav className="navbar">
          <NavLink to="/" className="seemy-logo">
            seemy
          </NavLink>
          <img
            className="show-menu-img"
            onClick={this.showMenu}
            src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/user.png`}
            alt=""
          />
        </nav>
        {showMenu && (
          <ul className="menu">
            {!isLoggedIn && (
              <NavLink to={'/signup'} className="navlink">
                <li>Sign Up</li>
              </NavLink>
            )}
            {!isLoggedIn && (
              <NavLink to={'/login'} className="navlink">
                <li className="login-navlink">Log In</li>
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink to={`/driver/${user._id}`} className="navlink">
                <li>Your Profile</li>
              </NavLink>
            )}

            <NavLink to={'/cars'} className="navlink">
              <li>Cars</li>
            </NavLink>

            <NavLink to={'/learn-more'} className="navlink">
              <li>Learn More</li>
            </NavLink>

            <li>
              <NavLink to={'/cars/add'} className="navlink">
                <button className="nav-btn">List Your Car</button>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

export default withAuth(Navbar);
