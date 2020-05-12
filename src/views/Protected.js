import React, { Component } from "react";

import { withAuth } from "../context/authContext";

class Protected extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <h1>Protected</h1>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Protected);
