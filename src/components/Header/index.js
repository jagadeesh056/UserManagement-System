import { Component } from 'react';

import './index.css';

class Header extends Component {
  render() {
    return (
      <div className="headerSection">
        <div>

        <img
          src="https://res.cloudinary.com/learning-platform/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https%3A%2F%2Fwww.ajackus.com%2Fimages%2Flogo-icon-blue.svg"
          alt="company-icon"
        />
        <div>
          <h1>GENERAL</h1>
          <p>Dashboard</p>
          <p>Connections</p>
          <p>Notifications</p>
          <h1>ACCOUNT</h1>
          <p>User List</p>
          <p>Security & Access</p>
          <p>Payments</p>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;