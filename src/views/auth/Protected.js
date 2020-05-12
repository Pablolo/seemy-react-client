import React, { Component } from "react";

import { withAuth } from "../../context/authContext";

class Resorts extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <h1>You&apos;re already Logged In</h1>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Resorts);