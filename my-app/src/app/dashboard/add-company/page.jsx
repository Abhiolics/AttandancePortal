"use client";

import axios from 'axios';
import React, { useState } from 'react';

export default function UpdateCompanyPage() {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = JSON.stringify({
      companyName,
      companyId,
      status,
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://attend.anujdwivedi.in/company/update-company/1', // Adjust the URL with the appropriate company ID
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3OTk5MzE1fQ.pnsgXqSyIYysmmWeB9B4TZBrgZy7OwKvvFZIkV6cEYg'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setResponseMessage('An error occurred while updating the company.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Company</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Company ID</label>
          <input
            type="text"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            placeholder="Company ID"
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          >
            <option value={0}>Inactive</option>
            <option value={1}>Active</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn w-32 bg-blue-500 text-white py-2 px-4 rounded"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
      {responseMessage && (
        <p className="mt-4 text-center text-green-500">{responseMessage}</p>
      )}
    </div>
  );
}

