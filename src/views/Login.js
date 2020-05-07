import React, { Component } from "react";
import { withAuth } from "../context/authContext";

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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
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

export default withAuth(Login);