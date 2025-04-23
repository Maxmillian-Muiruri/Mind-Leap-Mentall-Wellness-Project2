import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get('/api/admin/users');
        setUsers(usersResponse.data);

        const appointmentsResponse = await api.get('/api/admin/appointments');
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error('Token expired. Redirecting to login...');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          console.error('Error fetching data:', error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      {users.length === 0 ? <p>No users found.</p> : (
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}
      <h2>Appointments</h2>
      {appointments.length === 0 ? <p>No appointments found.</p> : (
        <ul>
          {appointments.map(app => (
            <li key={app._id}>{app.fullName} - {app.appointmentDateTime}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;