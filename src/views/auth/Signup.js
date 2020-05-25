import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withAuth } from '../../context/authContext';

import './Signup.css';

const validEmailRegex =
  // eslint-disable-next-line
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

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
    },
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { errors } = this.state;

    switch (name) {
      case 'firstName':
        errors.firstName = value.length === 0 ? 'Please enter your First Name' : '';
        break;
      case 'lastName':
        errors.lastName = value.length === 0 ? 'Please enter your Last Name' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Please enter a valid email adress';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        break;
      // no default
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password, errors } = this.state;
    const { onSignup } = this.props;
    if (validateForm(errors) && firstName !== '' && lastName !== '' && email !== '' && password !== '') {
      onSignup({ firstName, lastName, email, password });
    } else {
      console.error('Invalid Form');
    }
  };

  render() {
    const { firstName, lastName, email, password, errors } = this.state;
    const { error } = this.props;
    return (
      <div className="signup-page">
        <div className="form-wrapper">
          <h1>Let&apos;s get Started</h1>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <div className="first-lastName-wrapper">
              <div className="firstName-wrapper">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.firstName.length > 0 && <span className="signup-error">{errors.firstName}</span>}
              </div>
              <div className="lastName-wrapper">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.lastName.length > 0 && <span className="signup-error">{errors.lastName}</span>}
              </div>
            </div>
            <p>Enter your name as it appears on your drivers license</p>
            <label htmlFor="email">Email</label>
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
            {errors.email.length > 0 && <span className="signup-error">{errors.email}</span>}
            {errors.email.length === 0 && email !== '' && <span className="signup-valid">Your Email is correct</span>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Must be at least 8 characters in length"
              value={password}
              onChange={this.handleChange}
              minLength="8"
              noValidate
              required
            />
            {errors.password.length > 0 && <span className="signup-error">{errors.password}</span>}
            {errors.password.length === 0 && password !== '' && (
              <span className="signup-valid">Your Password is correct</span>
            )}
            <p>*All fields are required</p>
            {error && (
              <div>
                {error}. Do you want to <Link to={'/login'}>Log In</Link> instead?
              </div>
            )}
            <input className="signup-btn" type="submit" value="Create Account" />
          </form>
          <div className="already-account-wrapper">
            <p>Already have an account?</p>
            <Link to={'/login'}>
              <button className="signup-login-btn">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  onSignup: PropTypes.object,
  error: PropTypes.string,
};

export default withAuth(Signup);
