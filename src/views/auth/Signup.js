import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from 'react-router-dom';

class Signup extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const { onSignup } = this.props;
    if ( firstName !== '' && lastName !== '' && email !== '' && password !== '') {
      onSignup({ firstName, lastName, email, password });
    }
  };

  cleanForm = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div>
        <h1>Let's get Started</h1>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <br></br>
        <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChange}
          />
          <br></br>
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChange}
          />
          <br></br>
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
          <input type="submit" value="Sign Up" />
        </form>
        <p>Already have an account?</p><Link to={'/login'}><button>Log In</button></Link> 
      </div>      
    );
  }
}

export default withAuth(Signup);