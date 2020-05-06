import React from 'react';
import { Switch } from 'react-router-dom';

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import LoginWithAuth from './views/Login';

import AuthProvider from './context/authContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          Hello!
          <Switch>
            <AnonRoute exact path={'/login'} component={LoginWithAuth}/>
            {/* <PrivateRoute exact path={'/whatever'} component={whatever}/> */}
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
