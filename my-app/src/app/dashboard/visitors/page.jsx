
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisitorPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    company: '',
    meetingPurpose: '',
    contactPerson: '',
    remarks: '',
    status: 1,
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const config = {
        method: 'get',
        url: 'https://attend.anujdwivedi.in/recognition/get-visitors',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };
      const response = await axios.request(config);
      setVisitors(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch visitors');
    }
  };

  const handleAdd = () => {
    setCurrentVisitor({
      name: '',
      phoneNumber: '',
      email: '',
      company: '',
      meetingPurpose: '',
      contactPerson: '',
      remarks: '',
      status: 1,
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentVisitor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: 'post',
        url: 'https://attend.anujdwivedi.in/recognition/add-visitor',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        },
        data: JSON.stringify(currentVisitor)
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchVisitors();
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to add visitor');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const VisitorForm = ({ currentVisitor, handleChange, handleSubmit, handleCancel }) => {
    const fields = Object.keys(currentVisitor).filter(key => key !== 'status');

    return (
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
        <div className="grid grid-cols-3 gap-4">
          {fields.map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={currentVisitor[key]}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 w-28 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 w-28 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding ? (
        <VisitorForm
          currentVisitor={currentVisitor}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAdd}
            >
              Add Visitor
            </button>
          </div>
          <table className="min-w-full bg-white border text-black">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border text-center">S.No</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Phone Number</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Company</th>
                <th className="py-2 px-4 border">Meeting Purpose</th>
                <th className="py-2 px-4 border">Contact Person</th>
                <th className="py-2 px-4 border">Remarks</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, index) => (
                <tr key={visitor.id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{visitor.name}</td>
                  <td className="py-2 px-4 border">{visitor.phoneNumber}</td>
                  <td className="py-2 px-4 border">{visitor.email}</td>
                  <td className="py-2 px-4 border">{visitor.company}</td>
                  <td className="py-2 px-4 border">{visitor.meetingPurpose}</td>
                  <td className="py-2 px-4 border">{visitor.contactPerson}</td>
                  <td className="py-2 px-4 border">{visitor.remarks}</td>
                  <td className="py-2 px-4 border">{visitor.status === 1 ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default VisitorPage;

