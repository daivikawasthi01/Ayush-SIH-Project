import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart'; 
import './App.css';

export default function Dashboard() {
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/registration-details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data) {
          setRegistrationData(response.data);
        } else {
          setError('You are not registered. Please register first.');
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('You are not registered. Please register first.');
        } else {
          setError('Error fetching registration details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, []);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      {registrationData.subOrganizationType ? (
        <div className="dashboard-content">
          <div className="registration-details">
            <h2>Registration Details</h2>
            
            <p><strong>Organization Type:</strong> {registrationData.organizationType}</p>
            <p><strong>Sub Organization Type:</strong> {registrationData.subOrganizationType}</p>
            <p><strong>First Name:</strong> {registrationData.firstName}</p>
            <p><strong>Last Name:</strong> {registrationData.lastName}</p>
            <p><strong>Organization Name:</strong> {registrationData.organizationName}</p>
            <p><strong>Gender:</strong> {registrationData.gender}</p>
            <p><strong>Contact Number:</strong> {registrationData.contactNumber}</p>
            <p><strong>State:</strong> {registrationData.state}</p>
            <p><strong>District:</strong> {registrationData.district}</p>
            <p><strong>Address:</strong> {registrationData.address}</p>
            <p><strong>Pincode:</strong> {registrationData.pincode}</p>
            <p><strong>Mobile Number:</strong> {registrationData.mobileNumber}</p>
            <p><strong>Email:</strong> {registrationData.email}</p>
            <p><strong>Head of Organization:</strong> {registrationData.headOfOrganization}</p>
            <p><strong>Organization Address:</strong> {registrationData.orgAddress}</p>
            <p><strong>Organization Contact Number:</strong> {registrationData.orgContactNumber}</p>
            <p><strong>Organization Email ID:</strong> {registrationData.orgEmailID}</p>
            <p><strong>Coordinator Name:</strong> {registrationData.coordinatorName}</p>
            <p><strong>Coordinator Contact Number:</strong> {registrationData.coordinatorContactNumber}</p>
            <p><strong>Coordinator Email ID:</strong> {registrationData.coordinatorEmailID}</p>
          </div>
          <div className="pie-chart">
            <PieChart data={registrationData} />
          </div>
        </div>
      ) : (
        <div>You are not registered. Please register first.</div>
      )}
    </div>
  );
}
