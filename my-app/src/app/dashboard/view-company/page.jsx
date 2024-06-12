
"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Component to view the list of companies
function ViewCompany({ setMode }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/company/get-companies',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3OTk5MzE1fQ.pnsgXqSyIYysmmWeB9B4TZBrgZy7OwKvvFZIkV6cEYg'
        }
      };
      
      try {
        const response = await axios.request(config);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button 
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setMode('add')}
        >
          Add Company
        </button>
        <button 
          className="px-4 py-2 bg-orange-500 text-white rounded"
          onClick={() => setMode('update')}
        >
          Update Company
        </button>
      </div>
      {loading ? (
        <div className='flex mt-32 items-center justify-center w-full h-full'>
          <p className='loading loading-ring loading-lg'>Loading...</p>
        </div>
      ) : (
        data.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((company, index) => (
                  <tr key={company.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.companyId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.status === 1 ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

// Component to add a company
function AddCompany({ setMode }) {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = async () => {
    setLoading(true);
    setErrorMessage('');
    const data = JSON.stringify({
      companyName,
      companyId,
      status,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://attend.anujdwivedi.in/company/add-company',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setResponseMessage(response.data.message);
      setTimeout(() => setMode('view'), 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while adding the company. Please check your input.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 mt-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-[#182237] rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Add Company</h2>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-name">
                Company Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-company-name"
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-id">
                Company ID
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-company-id"
                type="text"
                placeholder="Company ID"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-status">
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                  id="grid-status"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  required
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Company'}
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-green-500">{responseMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

// Component to update a company
function UpdateCompany({ setMode }) {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage('');
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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY' // Ensure this token is valid
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setResponseMessage(response.data.message);
      setTimeout(() => setMode('view'), 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while updating the company. Please check your input.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 mt-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-[#182237]  rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Update Company</h2>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-name">
                Company Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-company-name"
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-id">
                Company ID
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-company-id"
                type="text"
                placeholder="Company ID"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-status">
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                  id="grid-status"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  required
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Company'}
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-green-500">{responseMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

// Main component to integrate all three views
export default function CompanyManagementPage() {
  const [mode, setMode] = useState('view');

  return (
    <div>
      {mode === 'view' && <ViewCompany setMode={setMode} />}
      {mode === 'add' && <AddCompany setMode={setMode} />}
      {mode === 'update' && <UpdateCompany setMode={setMode} />}
    </div>
  );
}
