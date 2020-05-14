import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from "../context/authContext";

class Navbar extends Component {

  render() {
    // const userId = this.props.user.data._id;
    console.log('navbar props', this.props)
    return (
      <nav>
         <Link to='/' className='seemy-logo'>seemy</Link>
         <div>
           <Link to={'/cars'}>Cars</Link>
           <Link to={'/learn-more'}>Learn More</Link>
           <Link to={'/signup'}>Sign Up</Link>
           <Link to={'/login'}>Log In</Link>
           {/* {props && <Link to={`/driver/${props}`}>Your Profile</Link>} */}
           {/* { userId ? <Link to={`/driver/${this.props.user.data._id}`}>Your Profile</Link> : null } */}
           <Link to={'/cars/add'}><button>List Your Car</button></Link>
         </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
