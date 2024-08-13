"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { FaListCheck } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter }  from 'next/navigation';
import { BASE_URL } from '../../../config';
import { getCookie } from 'cookies-next';

export default function SuperAdminPage() {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showGetAdminListModal, setShowGetAdminListModal] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin', status: 1 });
  const [updateAdmin, setUpdateAdmin] = useState({ id: '', name: '', email: '', role: 'admin', status: 1 });
  const [showUpdateAdminModal, setShowUpdateAdminModal] = useState(false);
  const router = useRouter();
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  const handleAddAdmin = async () => {
    const data = JSON.stringify(newAdmin);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/admin/register-admin`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      toast.success('Admin added successfully');
      setShowAddAdminModal(false);
    } catch (error) {
      console.log(error);
      toast.error('Error adding admin');
    }
  };

  const handleGetAdminList = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/admin/get-all-admin`,
      headers: { 
        'Authorization': 'Bearer ' + token
      }
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      setAdminList(response.data.data);  
      setShowGetAdminListModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAdmin = async () => {
    const data = JSON.stringify(updateAdmin);

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:`${BASE_URL}/admin/update-admin/${updateAdmin.id}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      toast.success('Admin updated successfully');
      setShowUpdateAdminModal(false);
      handleGetAdminList(); 
    } catch (error) {
      console.log(error);
      toast.error('Error updating admin');
    }
  };

  const handleLogout = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/admin/logout`,
      headers: { 
        'Authorization': 'Bearer ' + token
      }
    };

    try {
      await axios.request(config);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Error logging out');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#151c2c] ${showAddAdminModal || showGetAdminListModal ? 'backdrop-blur-md' : ''}`}>
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <button
          className="btn btn-primary text-lg w-[200px] text-white"
          onClick={() => setShowAddAdminModal(true)}
        >
          Add Admin<IoMdPersonAdd />
        </button>
        <button
          className="btn btn-secondary text-lg w-[200px] text-white"
          onClick={handleGetAdminList}
        >
          Admin List <FaListCheck />
        </button>
        <button
          className="btn btn-outline text-lg w-[200px] text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {showAddAdminModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#151c2c] bg-opacity-75 z-50 mt-32">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-black mb-4">Add Admin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-md text-black">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Status</label>
                <select
                  className="input input-bordered w-full"
                  value={newAdmin.status}
                  onChange={(e) => setNewAdmin({ ...newAdmin, status: parseInt(e.target.value) })}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <button className="btn btn-primary w-full text-lg" onClick={handleAddAdmin}>
                Submit
              </button>
            </div>
            <button
              className="btn btn-outline text-black mt-4 text-lg w-full"
              onClick={() => setShowAddAdminModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showGetAdminListModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#151c2c] bg-opacity-75 z-50 mt-32">
          <div className="bg-[#182237] p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Admin List</h2>
            <table className="min-w-full bg-white">
              <thead className='bg-gray-500 border'>
                <tr>
                  <th className="py-2 text-white border-black border">Name</th>
                  <th className="py-2 text-white border-black border">Email</th>
                  <th className="py-2 text-white border-black border">Role</th>
                  <th className="py-2 text-white border-black border">Status</th>
                  <th className="py-2 text-white border-black border">Action</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin) => (
                  <tr key={admin.id}>
                    <td className="py-2 text-black border border-black text-center">{admin.name}</td>
                    <td className="py-2 text-black border border-black text-center">{admin.email}</td>
                    <td className="py-2 text-black border border-black text-center">{admin.role}</td>
                    <td className="py-2 text-black border border-black text-center">
                      {admin.status === 1 ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-2 text-black border border-black text-center">
                      <button
                        className='bg-yellow-500 text-white px-4 py-2 rounded border-none'
                        onClick={() => {
                          setUpdateAdmin({ id: admin.id, name: admin.name, email: admin.email, role: admin.role, status: admin.status });
                          setShowUpdateAdminModal(true);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="px-4 py-2 mt-4 btn bg-red-500 text-white w-28 rounded border-none text-lg"
              onClick={() => setShowGetAdminListModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showUpdateAdminModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#151c2c] bg-opacity-75 z-50 mt-32">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-black mb-4">Update Admin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-md text-black">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updateAdmin.name}
                  onChange={(e) => setUpdateAdmin({ ...updateAdmin, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={updateAdmin.email}
                  onChange={(e) => setUpdateAdmin({ ...updateAdmin, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Role</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updateAdmin.role}
                  onChange={(e) => setUpdateAdmin({ ...updateAdmin, role: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-md text-black">Status</label>
                <select
                  className="input input-bordered w-full"
                  value={updateAdmin.status}
                  onChange={(e) => setUpdateAdmin({ ...updateAdmin, status: parseInt(e.target.value) })}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <button className="btn btn-primary w-full text-lg" onClick={handleUpdateAdmin}>
                Submit
              </button>
            </div>
            <button
              className="btn btn-outline text-black mt-4 text-lg w-full"
              onClick={() => setShowUpdateAdminModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}








