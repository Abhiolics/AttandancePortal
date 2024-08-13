"use client"
import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../../../../config";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      url: `${BASE_URL}/admin/change-password`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Error changing password');
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 p-4">
      <div className="w-full max-w-md bg-[#182237] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Update Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
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
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;





