import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ModalForm from './ModalForm';
import DeleteConfirmation from './DeleteConfirmation';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate(); // To programmatically navigate

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    setIsEditing(false);
    setCurrentUser(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addUser = (newUser) => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        ...newUser,
        id: users.length + 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        handleCloseModal();
      })
      .catch((error) => console.error('Error creating user:', error));
  };

  const editUser = (updatedUser) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === data.id ? data : user))
        );
        handleCloseModal();
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
        handleCloseDeleteModal();
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Redirect to user details page
  const handleViewDetails = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="Home">
      <h1 style={{ textAlign: 'center' }}>User List</h1>

      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', display: 'block', width: '40%', margin: 'auto' }}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px' }}
        onClick={handleOpenModal}
      >
        Create New User
      </Button>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <table border="1" cellPadding="10" style={{ margin: "auto", width: "80%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
              <th>Details</th> {/* New column for details */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr 
                key={user.id} 
                style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#d1e7dd' }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button 
                    variant="contained" 
                    onClick={() => handleEdit(user)} 
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    style={{ backgroundColor: 'red', color: 'white' }} 
                    onClick={() => handleOpenDeleteModal(user)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="contained" 
                    onClick={() => handleViewDetails(user.id)} // Navigate to user details page
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalForm
        open={openModal}
        handleClose={handleCloseModal}
        addUser={addUser}
        editUser={editUser}
        isEditing={isEditing}
        currentUser={currentUser}
      />

      <DeleteConfirmation
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeleteUser}
      />
    </div>
  );
}

export default Home;
