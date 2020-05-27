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
      <div>
        <nav className="w-screen fixed z-40 px-8 py-4 flex justify-between bg-white shadow-xl">
          <NavLink to="/" className="font-bold text-3xl">
            seemy
          </NavLink>
          <img
            className="h-8 w-auto cursor-pointer mt-2 relative"
            onClick={this.showMenu}
            src={`${process.env.REACT_APP_BACKEND_URI}/images/misc/user.png`}
            alt="seemy-menu-icon"
          />
        </nav>
        {showMenu && (
          <ul className="bg-white rounded-sm shadow-2xl z-40 absolute right-0 mt-20 mr-1">
            {!isLoggedIn && <NavBarLink to={'/signup'} name={'Sign Up'} />}
            {!isLoggedIn && <NavBarLink to={'/login'} name={'Log In'} addcss={'border-b-2'} />}
            {isLoggedIn && <NavBarLink to={`/driver/${user._id}`} name={'Your Profile'} />}
            <NavBarLink to={'/cars'} name={'Cars'} />
            <NavBarLink to={'/learn-more'} name={'Learn More'} />
            <li className="px-12 py-3">
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
