import React, { Component } from "react";
import { withAuth } from "../context/authContext";
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { 
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    if (email !== '' && password !== '') {
      onLogin({ email, password });
    }
  };

  cleanForm = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Welcome Back</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Your Email</label>
          <br></br>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
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
          <br></br>
          <input type="submit" value="Log In" />
        </form>
        <p>Don't have an account?</p><Link to={'/signup'}><button>Sign Up</button></Link>
      </div>      
    );
  }
}

export default withAuth(Login);