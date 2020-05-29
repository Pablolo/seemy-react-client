import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withAuth } from '../../context/authContext';

// import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: false,
      password: false,
    },
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    if (email !== '' && password !== '') {
      onLogin({ email, password });
      this.setState({
        errors: {
          email: !email,
          password: !password,
        },
      });
    } else if (email === '' && password === '') {
      this.setState({
        errors: {
          email: !email,
          password: !password,
        },
      });
    } else if (email === '' && password !== '') {
      this.setState({
        errors: {
          email: !email,
        },
      });
    } else if (email !== '' && password === '') {
      this.setState({
        errors: {
          password: !password,
        },
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, errors } = this.state;
    const { error } = this.props;
    return (
      <div className="absolute mt-20 w-screen text-center bg-gray-200">
        <div className="w-5/6 my-8 bg-white shadow-md rounded px-8 pt-6 pb-8 my-0 mx-auto">
          <h1 className="text-2xl font-bold text-center my-8">Welcome Back</h1>
          <form className="flex flex-col" onSubmit={this.handleSubmit}>
            <label className="block text-gray-700 font-bold mb-2 text-left w-2/3 my-0 mx-auto" htmlFor="email">
              Your Email
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <div className="signup-error">Email field cannot be empty</div>}
            <label className="block text-gray-700 font-bold mb-2 text-left w-2/3 mt-2 mx-auto" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded my-0 mx-auto w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && <div className="">Password cannot be empty</div>}
            {error && <div className="">{error}</div>}
            <div className="mx-auto w-2/3 justify-between flex items-center my-8">
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
                value="Sign In"
              />
              <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className="mt-4">
            <p className="font-bold text-sm">Don&apos;t have an account?</p>
            <Link to={'/signup'}>
              <button className="mt-4 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mb-20">&copy;2020 Seemy. All rights reserved.</p>
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  onLogin: PropTypes.object,
};

export default withAuth(Login);
