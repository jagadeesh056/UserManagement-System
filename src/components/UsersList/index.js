import React, { Component } from 'react';
import { CiEdit } from 'react-icons/ci';
import { TbHttpDelete } from 'react-icons/tb';
import './index.css';

class UsersList extends Component {
  render() {
    const { users, handleEditUser, handleDeleteUser, handleAddUser } =
      this.props;

    return (
      <div className="userListItems">
        <div className='addButtonSection'>
          <h1>User Management</h1>
          <button onClick={handleAddUser} className='addButton'>Add User</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((eachUser) => (
                <tr key={eachUser.id}>
                  <td>{eachUser.id}</td>
                  <td>{eachUser.firstname}</td>
                  <td>{eachUser.lastname}</td>
                  <td>{eachUser.email}</td>
                  <td>{eachUser.department}</td>
                  <td>
                    <button
                      className="editBtn"
                      onClick={() => handleEditUser(eachUser)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteUser(eachUser.id)}
                    >
                      <TbHttpDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UsersList;