import React, { Component } from 'react';

import apiClient from '../services/apiClient';

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ handleSignup, handleLogin, user, isLoggedIn, handleLogout }) => {
            return (
              <Comp 
                onSignup={handleSignup}
                onLogin={handleLogin}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                {...this.props}
              />
            )
          }}
        </AuthContext.Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
    .whoami()
    .then((user) => {
      this.setState({
        isLoading: false,
        isLoggedIn: true,
        user,
      });
    })
    .catch((error) => {
      this.setState({
        isLoading: false,
          isLoggedIn: false,
          user: null,
      });
    })
  } 

  handleSignup = ({ firstName, lastName, email, password }) => {
    apiClient
    .signup({ firstName, lastName, email, password })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleLogin = ({ email, password }) => {
    apiClient
      .login({ email, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { children } = this.props;
    const { isLoggedIn, user } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          user,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;