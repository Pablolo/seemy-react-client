import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withAuth } from "../context/authContext";

class Navbar extends Component {
  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <nav>
         <Link to='/' className='seemy-logo'>seemy</Link>
         <div>
           <Link to={'/cars'}>Cars</Link>
           <Link to={'/learn-more'}>Learn More</Link>
           { !isLoggedIn && <Link to={'/signup'}>Sign Up</Link> }
           { !isLoggedIn && <Link to={'/login'}>Log In</Link> }
           { isLoggedIn && <Link to={`/driver/${user._id}`}>Your Profile</Link> }
           <Link to={'/cars/add'}><button>List Your Car</button></Link>
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
