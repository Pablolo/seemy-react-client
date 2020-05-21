import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from 'react-router-dom';

const validEmailRegex = 
// eslint-disable-next-line
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Signup extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let { errors } = this.state;

    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length === 0
            ? 'Please enter your First Name'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
          value.length === 0
            ? 'Please enter your Last Name'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Please enter a valid email adress';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long'
            : '';
        break;
      // no default
    }
    this.setState({errors, [name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, errors } = this.state;
    const { onSignup } = this.props;
    if (validateForm(errors) && firstName !== '' && lastName !== '' && email !== '' && password !== '') {
      console.info('Valid Form');
      onSignup({ firstName, lastName, email, password });
    } else {
      console.error('Invalid Form');
    }
  }

  render() {
    const { firstName, lastName, email, password, errors } = this.state;
    const { error } = this.props;
    return (
      <div>
        <h1>Let's get Started</h1>
        <h2>Create your Account*</h2>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <br></br>
        <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name as appears on your driver's license"
            value={firstName}
            onChange={this.handleChange}
            noValidate
            required
          />
          {errors.firstName.length > 0 && <span className='signup-error'>{errors.firstName}</span>}
          <br></br>
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name as appears on your driver's license"
            value={lastName}
            onChange={this.handleChange}
            noValidate
            required
          />
          {errors.lastName.length > 0 && <span className='signup-error'>{errors.lastName}</span>}
          <br></br>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={this.handleChange}
            noValidate
            required
          />
          {errors.email.length > 0 && <span className='signup-error'>{errors.email}</span>}
          {errors.email.length === 0 && email !== '' && <span className='signup-valid'>Your Email is correct</span>}
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Must be at least 8 characters in length. White spaces are not allowed"
            value={password}
            onChange={this.handleChange}
            minLength="8"
            noValidate
            required
          />
          {errors.password.length > 0 && <span className='signup-error'>{errors.password}</span>}
          {errors.password.length === 0 && password !== '' && <span className='signup-valid'>Your Password is correct</span>}
          <br></br>
          <p>*All fields are required</p>
          {error &&  <div>{error}. Do you want to <Link to={'/login'}>Log In</Link> instead?</div>}
          <input type="submit" value="Sign Up" />
        </form>
        <p>Already have an account?</p><Link to={'/login'}><button>Log In</button></Link> 
      </div>      
    );
  }
}

export default withAuth(Signup);