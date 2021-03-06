import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from '../context/authContext';
import NavBarLink from './NavBarLink';

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
      <div className="fixed z-40">
        <nav className="w-screen pl-4 pr-8 py-4 flex justify-between bg-white shadow-lg">
          <NavLink to="/">
            <img
              className="h-10 mt-2"
              src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/seemy-logo-one.png`}
              alt="seemy-logo"
            />
          </NavLink>
          <img
            className="h-8 w-auto cursor-pointer mt-2 relative"
            onClick={this.showMenu}
            src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/user.png`}
            alt="seemy-menu-icon"
          />
        </nav>
        {showMenu && (
          <ul className="bg-white rounded-sm shadow-2xl z-40 absolute right-0">
            {!isLoggedIn && <NavBarLink to={'/signup'} name={'Sign Up'} />}
            {!isLoggedIn && <NavBarLink to={'/login'} name={'Log In'} addcss={'border-b-2'} />}
            {isLoggedIn && (
              <NavBarLink to={`/driver/${user._id}`} name={'Your Profile'} addcss={'border-t-2 border-b-2'} />
            )}
            <NavBarLink to={'/cars'} name={'All Cars'} />
            <NavBarLink to={'/learn-more'} name={'Learn More'} />
            <li className="px-12 py-3 mb-2">
              <NavLink to={'/cars/add'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  List Your Car
                </button>
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
