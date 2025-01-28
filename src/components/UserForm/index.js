import React, { Component } from 'react';
import './index.css';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user?.id || null,
      firstName: props.user?.firstname || '',
      lastName: props.user?.lastname || '',
      email: props.user?.email || '',
      department: props.user?.department || 'IT & Communication',
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      this.setState({
        id: user?.id || null,
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',
        email: user?.email || '',
        department: user?.department || 'IT & Communication',
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { id, firstName, lastName, email, department } = this.state;
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{id ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={department}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">{id ? 'Save Changes' : 'Add User'}</button>
              <button type="button" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;