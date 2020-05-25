import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withAuth } from '../../context/authContext';

import './Login.css';

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
      <div className="login-page">
        <div className="login-form-wrapper">
          <h1>Welcome Back</h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <label className="login-form-label" htmlFor="email">Your Email</label>
            <input
              className="login-form-input"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <div className="signup-error">Email field cannot be empty</div>}
            <label className="login-form-label" htmlFor="password">Password</label>
            <input
              className="login-form-input"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && <div className="signup-error">Password cannot be empty</div>}
            {error && <div className="signup-error">{error}</div>}
            <input className="login-btn" type="submit" value="Log In" />
          </form>
          <div className="already-account-wrapper">
            <p>Don&apos;t have an account?</p>
            <Link to={'/signup'}>
              <button className="signup-login-btn">Sign Up</button>
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
