import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { 
    email: '',
    password: '',
    errors: {
      email: false,
      password: false,
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    if (email !== '' && password !== '') {
      onLogin({ email, password });
      this.setState({
        errors: {
          email: !email,
          password: !password,
        }
      })
    } else if (email === '' && password === '') {
      this.setState({
        errors: {
          email: !email,
          password: !password,
        }
      })
    } else if (email === '' && password !== '') {
      this.setState({
        errors: {
          email: !email,
        }
      })
    } else if (email !== '' && password === '') {
      this.setState({
        errors: {
          password: !password,
        }
      })
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, errors } = this.state;
    const { error } = this.props;
    return (
      <div>
        <h1>Welcome Back</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Your Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <div className='signup-error'>Email field cannot be empty</div>}
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password && <div className='signup-error'>Password cannot be empty</div>}
          <br></br>
          {error && <div className='signup-error'>{error}</div>}
          <input type="submit" value="Log In" />
        </form>
        <p>Don't have an account?</p><Link to={'/signup'}><button>Sign Up</button></Link>
      </div>      
    );
  }
}

export default withAuth(Login);