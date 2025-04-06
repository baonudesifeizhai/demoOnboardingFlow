import React, { useState, useEffect } from 'react';
import '../assets/styles/DataTable.css';

const DataTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="data-table-container">
      <h2>User Data</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Birthdate</th>
            <th>About Me</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.birthdate}</td>
              <td>{user.aboutMe}</td>
              <td>
                {user.address && (
                  `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 