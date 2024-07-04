'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.module.css'; // Import CSS for flip animation
import Footer from '../../ui/dashboard/footer/footer';

const AdminPage = () => {
  const [adminData, setAdminData] = useState({});
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false); 
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
      toast.success(response.data.message);
      setShowChangePassword(false); // Hide the password change form
    } catch (error) {
      toast.error('Error changing password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 gap-4 w-full max-w-full">
        <div className="bg-[#182237] rounded-lg shadow-md p-6">
          {!showChangePassword ? (
            <>
             <div className="relative  flex items-center justify-center">
            {isLoading ? (
              <div className="absolute  inset-0 flex flex-col items-center justify-center  bg-transparent bg-opacity-50">
                <div role='status' className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2> 
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="w-32 rounded-lg mb-4"
                  src="https://tse3.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain"
                  alt="Admin Profile"
                />
                <h2 className="text-2xl font-bold mb-2 mt-2 text-white">Admin Details</h2>
                <p className="text-white"><strong>Name:</strong> {adminData.name}</p>
                <p className="text-white"><strong>Email:</strong> {adminData.email}</p>
                <p className="text-white"><strong>Role:</strong> {adminData.role}</p>
                <p className="text-white"><strong>Status:</strong> {adminData.status === 1 ? 'Active' : 'Inactive'}</p>
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                  Change Password
                </button>
                {!isLoading && <Footer />}
              </div>
            )}
            </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">Update Password</h2>
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
                <button type="submit" className="w-32 bg-blue-500 text-white p-2 rounded mt-4 mr-4">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="w-32 bg-gray-500 text-white p-2 rounded mt-4"
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





