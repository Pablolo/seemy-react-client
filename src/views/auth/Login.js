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
        <div className="w-5/6 my-0 mx-auto border border-gray-400">
          <h1 className="text-2xl font-bold text-center my-8">Welcome Back</h1>
          <form className="flex flex-col" onSubmit={this.handleSubmit}>
            <label className="" htmlFor="email">
              Your Email
            </label>
            <input
              className="border border-gray-700 w-2/4 my-0 mx-auto"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <div className="signup-error">Email field cannot be empty</div>}
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-700 w-2/4 my-0 mx-auto"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && <div className="">Password cannot be empty</div>}
            {error && <div className="">{error}</div>}
            <input className="" type="submit" value="Log In" />
          </form>
          <div className="">
            <p>Don&apos;t have an account?</p>
            <Link to={'/signup'}>
              <button className="">Sign Up</button>
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
