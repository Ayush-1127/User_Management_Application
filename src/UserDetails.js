import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();  // Get the user ID from the route parameters
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="UserDetails" style={{ textAlign: 'center' }}>
      <h1>{user.name}'s Details</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>

      <Link to="/">Back to User List</Link>
    </div>
  );
}

export default UserDetails;
