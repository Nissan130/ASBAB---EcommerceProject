import React, { useEffect, useState } from "react";
import "./UsersList.css";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // Fetch the user info from the backend
  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5002/users"); // Call to backend API
        setUsers(response.data); // Store user info in state
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUsersInfo(); // Fetch users info on component mount
  }, []);

  return (
    <div className="users-list-container">
      <h2>User List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id}>
              <td>{index + 1}</td> {/* Serial number */}
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
