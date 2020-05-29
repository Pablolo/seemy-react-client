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
      <div className="absolute mt-24 w-screen text-center">
        <div className="w-5/6 my-6 mx-auto border border-gray-400 rounded">
          <h1 className="text-2xl font-bold text-center my-8">Welcome Back</h1>
          <form className="flex flex-col" onSubmit={this.handleSubmit}>
            <label className="w-2/3 my-0 mx-auto text-left" htmlFor="email">
              Your Email
            </label>
            <input
              className="border border-gray-700 w-2/3 my-0 mx-auto rounded-sm"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <div className="signup-error">Email field cannot be empty</div>}
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
            />
            {errors.password && <div className="">Password cannot be empty</div>}
            {error && <div className="">{error}</div>}
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/3 my-4 mx-auto cursor-pointer"
              type="submit"
              value="Log In"
            />
          </form>
          <div className="mt-4">
            <p>Don&apos;t have an account?</p>
            <Link to={'/signup'}>
              <button className="mb-8 mt-4 border border-black py-2 px-4">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  onLogin: PropTypes.object,
};

export default withAuth(Login);
