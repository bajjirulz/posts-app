// src/components/UserFilter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserFilter = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    onSelectUser(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    onSelectUser(event.target.value);
  };

  return (
    <div>
      <h2>User Filter</h2>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search Posts"
      />
    </div>
  );
};

export default UserFilter;