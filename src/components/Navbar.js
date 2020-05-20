import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from "../context/authContext";

class Navbar extends Component {
  state = {
    userId: '',
  }

  componentDidMount() {
    if (this.props.user !== null) {
      this.setState({
        userId: this.props.user._id
      })
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('prevprops user', prevProps.user)
    // console.log('user props now', this.props.user)
    if (prevProps.user && this.props.user) {
      if (prevProps.user._id !== this.props.user._id) {
        this.setState({
          userId: this.props.user._id
        })
      }
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { userId } = this.state;
    // console.log('state user id of navbar', userId)
    return (
      <nav>
         <Link to='/' className='seemy-logo'>seemy</Link>
         <div>
           <Link to={'/cars'}>Cars</Link>
           <Link to={'/learn-more'}>Learn More</Link>
           { !isLoggedIn && <Link to={'/signup'}>Sign Up</Link> }
           { !isLoggedIn && <Link to={'/login'}>Log In</Link> }
           { isLoggedIn && <Link to={`/driver/${userId}`}>Your Profile</Link> }
           <Link to={'/cars/add'}><button>List Your Car</button></Link>
         </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
