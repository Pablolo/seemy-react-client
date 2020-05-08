import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <header>
         <Link to='/' className='seemy-logo'>seemy</Link>
         <div>
           <Link to={'/cars'}>Cars</Link>
           <Link to={'/learn-more'}>Learn More</Link>
           <Link to={'/signup'}>Sign Up</Link>
           <Link to={'/login'}>Log In</Link>
           <Link to={'/cars/add'}><button>List Your Car</button></Link>
         </div>
      </header>
    );
  }
}

export default Navbar;