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
      <div className="absolute mt-20 w-screen text-center bg-gray-300">
        <div className="w-5/6 my-8 bg-white shadow-md mx-auto rounded px-8 pt-6 pb-8">
          <h1 className="text-2xl font-bold text-center my-8">Let&apos;s get Started</h1>
          <form className="flex flex-col items-center" onSubmit={this.handleSubmit}>
            <div className="flex flex-row w-11/12">
              <div className="flex flex-col w-2/4">
                <label className="block text-gray-700 font-bold mb-2 text-left w-full my-0 mx-auto" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded my-0 w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Name"
                  value={firstName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.firstName.length > 0 && (
                  <span className="text-red-500 text-sm italic w-4/5 text-left mx-auto">{errors.firstName}</span>
                )}
              </div>
              <div className="flex flex-col w-2/4">
                <label className="block text-gray-700 font-bold mb-2 text-left w-full my-0 mx-auto" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded my-0 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="LastName"
                  value={lastName}
                  onChange={this.handleChange}
                  noValidate
                  required
                />
                {errors.lastName.length > 0 && (
                  <span className="text-red-500 text-sm italic w-4/5 text-left mx-auto">{errors.lastName}</span>
                )}
              </div>
            </div>
            <p className="text-xs mb-2 mr-12">Enter your name as it appears on your drivers license</p>
            <label className="block text-gray-700 font-bold mb-2 text-left w-11/12 my-0 mx-auto" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              noValidate
              required
            />
            {errors.email.length > 0 && (
              <span className="text-red-500 text-sm italic w-11/12 text-left">{errors.email}</span>
            )}
            {errors.email.length === 0 && email !== '' && (
              <span className="text-green-500 text-sm italic w-11/12 text-left">Your Email is correct</span>
            )}
            <label className="block text-gray-700 font-bold mb-2 text-left w-11/12 my-0 mx-auto" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={this.handleChange}
              minLength="8"
              noValidate
              required
            />
            {errors.password.length > 0 && (
              <span className="text-red-500 text-sm italic w-4/5 text-left w-11/12">{errors.password}</span>
            )}
            {errors.password.length === 0 && password !== '' && (
              <span className="text-green-500 text-sm italic w-11/12 text-left">Your Password is correct</span>
            )}
            <p className="text-sm text-gray-700 mt-4">*All fields are required</p>
            {error && (
              <div>
                {error}. Do you want to <Link to={'/login'}>Log In</Link> instead?
              </div>
            )}
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-11/12 my-4 mx-auto cursor-pointer"
              type="submit"
              value="Create Account"
            />
          </form>
          <div className="mt-4">
            <p className="font-bold text-sm">Already have an account?</p>
            <Link to={'/login'}>
              <button className="mt-4 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow">
                Log In
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mb-20">&copy;2020 Seemy. All rights reserved.</p>
      </div>
    );
  }
}

Signup.propTypes = {
  onSignup: PropTypes.object,
  error: PropTypes.string,
};

export default withAuth(Signup);
