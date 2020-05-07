import React, { Component } from "react";
import { withAuth } from "../context/authContext";

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
    console.log('propsss', this.props)
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
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
        <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>      
    );
  }
}

export default withAuth(Signup);