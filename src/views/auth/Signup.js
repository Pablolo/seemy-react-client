import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withAuth } from '../../context/authContext';

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
      <div className="absolute mt-24 w-screen text-center">
        <div className="w-5/6 my-6 mx-auto border border-gray-400 rounded">
          <h1 className="text-2xl font-bold text-center my-8">Let&apos;s get Started</h1>
          <form className="flex flex-col items-center" onSubmit={this.handleSubmit}>
            <div className="flex flex-row w-2/3">
              <div className="flex flex-col w-2/4">
                <label className="w-full my-0 mx-auto text-left" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="border border-gray-700 w-11/12 rounded-sm"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.firstName.length > 0 && <span className="">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col w-2/4">
                <label className="w-full my-0 mx-auto text-left" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="border border-gray-700 w-full rounded-sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.lastName.length > 0 && <span className="">{errors.lastName}</span>}
              </div>
            </div>
            <p className="text-xs mb-2">Enter your name as it appears on your drivers license</p>
            <label className="w-2/3 my-0 mx-auto text-left" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-700 w-2/3 my-0 mx-auto rounded-sm"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              noValidate
              required
            />
            {errors.email.length > 0 && <span className="">{errors.email}</span>}
            {errors.email.length === 0 && email !== '' && <span className="">Your Email is correct</span>}
            <label className="w-2/3 my-0 mx-auto text-left" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-700 w-2/3 my-0 mx-auto rounded-sm"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
              minLength="8"
              noValidate
              required
            />
            {errors.password.length > 0 && <span className="">{errors.password}</span>}
            {errors.password.length === 0 && password !== '' && <span className="">Your Password is correct</span>}
            <p className="text-sm text-gray-700 mt-4">*All fields are required</p>
            {error && (
              <div>
                {error}. Do you want to <Link to={'/login'}>Log In</Link> instead?
              </div>
            )}
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/3 my-4 mx-auto cursor-pointer"
              type="submit"
              value="Create Account"
            />
          </form>
          <div className="mt-4">
            <p>Already have an account?</p>
            <Link to={'/login'}>
              <button className="mb-8 mt-4 border border-black py-2 px-4">Log In</button>
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
