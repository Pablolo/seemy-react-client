import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

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
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const { onSignup } = this.props;
    if ( firstName !== '' && lastName !== '' && email !== '' && password !== '') {
      onSignup({ firstName, lastName, email, password });
    }
  };

  // cleanForm = () => {
  //   this.setState({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //   });
  // };

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
  
    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length === 0
            ? 'Please enter your First Name'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
          value.length === 0
            ? 'Please enter your Last Name'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long'
            : '';
        break;
      // no default
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors);
    })
  };

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div>
        <h1>Let's get Started</h1>
        <h2>Create your Account</h2>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <br></br>
        <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name as appears on your driver's license"
            value={firstName}
            onChange={this.handleChange}
            noValidate
          />
          <br></br>
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name as appears on your driver's license"
            value={lastName}
            onChange={this.handleChange}
            noValidate
          />
          <br></br>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={this.handleChange}
            noValidate
          />
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Must be at least 8 characters in length. White spaces are not allowed"
            value={password}
            onChange={this.handleChange}
            noValidate
          />
          <br></br>
          <p>*All fields are required</p>
          <input type="submit" value="Sign Up" />
        </form>
        <p>Already have an account?</p><Link to={'/login'}><button>Log In</button></Link> 
      </div>      
    );
  }
}

export default withAuth(Signup);