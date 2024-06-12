"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.module.css'; // Import CSS for flip animation

const AdminPage = () => {
  const [adminData, setAdminData] = useState({});
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/admin/get-admin',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };

      try {
        const response = await axios.request(config);
        setAdminData(response.data);
        setEmail(response.data.email); // Set email for password change
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      email,
      oldPassword,
      newPassword,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://attend.anujdwivedi.in/admin/change-password',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setMessage(response.data.message);
      setError('');
      setShowChangePassword(false); // Hide the password change form
    } catch (error) {
      setMessage('');
      setError('Error changing password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full">
        <div className="bg-[#182237] rounded-lg  shadow-md p-6">
        <div className="flex flex-col items-center">
          <img className="w-32 h-40 rounded-lg" src="https://tse3.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain" alt="Admin Profile" />
        </div>
          {!showChangePassword ? (
            <>
            <div className='flex flex-col items-center justify-center'>
              <h2 className="text-2xl font-bold mb-2 mt-2">Admin Details</h2>
              <p className="text-white"><strong>Name:</strong> {adminData.name}</p>
              <p className="text-white"><strong>Email:</strong> {adminData.email}</p>
              <p className="text-white"><strong>Role:</strong> {adminData.role}</p>
              <p className="text-white"><strong>Status:</strong> {adminData.status === 1 ? 'Active' : 'Inactive'}</p>
              <button
                onClick={() => setShowChangePassword(true)}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Change Password
              </button></div>
              
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 ">Update Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white ">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="oldPassword" className="block text-white">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-white">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="w-full bg-gray-500 text-white p-2 rounded mt-4"
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;




