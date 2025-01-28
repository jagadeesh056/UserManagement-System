import { Component} from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { confirmAlert } from 'react-confirm-alert'

import UsersList from '../UsersList';
import Header from '../Header'
import UserForm from '../UserForm';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './index.css';

class HomePage extends Component {
  state = {
    users: [],
    selectedUser: null,
    showForm: false,
    currentPage: 1,
    usersPerPage: 5,
    error: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((user) => {
        const firstName = user.name.split(" ")[0];
        const lastName = user.name.split(" ")[1]
        return {
          id: user.id,
          firstname: firstName,
          lastname: lastName,
          email: user.email,
          department: 'IT & Communication',
        };
      });
      this.setState({ users: updatedData });
    }
  };

  handleAddUser = () => {
    this.setState({ showForm: true, selectedUser: null });
  };

  handleEditUser = (eachUser) => {
    this.setState({ showForm: true, selectedUser: eachUser });
  };

  handleDeleteUser = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) throw new Error('Failed to delete user');

              this.setState((prevState) => {
                const updatedUsers = prevState.users.filter((user) => user.id !== id);
                return { users: updatedUsers };
              });
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  handleFormSubmit = async (userData) => {
    try {
      const isEditing = Boolean(userData.id);
      const url = isEditing
        ? `https://jsonplaceholder.typicode.com/users/${userData.id}`
        : 'https://jsonplaceholder.typicode.com/users';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: JSON.stringify({
          ...userData,
          name: `${userData.firstName} ${userData.lastName}`,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok)
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} user`);

      const updatedUserData = await response.json();

      this.setState((prevState) => {
        const newUser = {
          id: isEditing ? userData.id : updatedUserData.id,
          firstname: userData.firstName,
          lastname: userData.lastName,
          email: userData.email,
          department: userData.department,
        };

        if (isEditing) {
          return {
            users: prevState.users.map((user) =>
              user.id === userData.id ? newUser : user
            ),
            showForm: false,
            selectedUser: null,
          };
        } else {
          return {
            users: [...prevState.users, newUser],
            showForm: false,
            selectedUser: null,
          };
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, selectedUser: null });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, showForm, selectedUser, currentPage, usersPerPage } = this.state;
    const token = Cookies.get('jwt_token');

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
      <div className="mainhomePage">
        <div className="userListPage">
          <div className="headerContainer">
            <Header />
            <div className='logBtn'>
              <button>Logout</button>
            </div>
          </div>
          <div className="contentContainer">
            <div className="showUsers">
              <UsersList
                users={currentUsers}
                handleEditUser={this.handleEditUser}
                handleDeleteUser={this.handleDeleteUser}
                handleAddUser={this.handleAddUser}
              />
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => this.handlePageChange(number)}
                        className="paginationBtn"
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {showForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <UserForm
                    show={showForm}
                    user={selectedUser}
                    onSubmit={this.handleFormSubmit}
                    onClose={this.handleCloseForm}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;