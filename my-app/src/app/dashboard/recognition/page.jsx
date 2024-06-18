
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecognitionPage = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentRecognition, setCurrentRecognition] = useState({
    id: '',
    companyId: '',
    employeeId: '',
    device: '',
    recognitionDate: '',
    recognitionTime: '',
    remarks: '',
    status: 0,
  });

  useEffect(() => {
    fetchRecognitions();
    fetchCompanies();
    fetchEmployees();
  }, []);

  const fetchRecognitions = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/recognition/get-employees',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };
      const response = await axios.request(config);
      setRecognitions(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch recognitions');
    }
  };

  const fetchCompanies = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/company/get-companies',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };
      const response = await axios.request(config);
      setCompanies(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch companies');
    }
  };

  const fetchEmployees = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/employee/get-employees',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };
      const response = await axios.request(config);
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch employees');
    }
  };

  const handleUpdate = (recognition) => {
    setCurrentRecognition(recognition);
    setIsUpdating(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setCurrentRecognition({
      id: '',
      companyId: '',
      employeeId: '',
      device: '',
      recognitionDate: '',
      recognitionTime: '',
      remarks: '',
      status: 0,
    });
    setIsAdding(true);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecognition({
      ...currentRecognition,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? 'put' : 'post',
        maxBodyLength: Infinity,
        url: isUpdating
          ? `https://attend.anujdwivedi.in/recognition/update-employee/${currentRecognition.id}`
          : 'https://attend.anujdwivedi.in/recognition/add-employee',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        },
        data: JSON.stringify(currentRecognition)
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchRecognitions();
      setIsUpdating(false);
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to add/update recognition');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setIsAdding(false);
  };

  const RecognitionForm = ({ currentRecognition, handleChange, handleSubmit, handleCancel, isUpdating, companies, employees }) => {
    return (
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company ID</label>
            <select
              name="companyId"
              value={currentRecognition.companyId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select Company</option>
              {companies.map((company) => (
                <option key={company.companyId} value={company.companyId}>{company.companyId}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
            <select
              name="employeeId"
              value={currentRecognition.employeeId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>{employee.employeeId}</option>
              ))}
            </select>
          </div>
          {Object.keys(currentRecognition).filter(key => key !== 'id' && key !== 'companyId' && key !== 'employeeId').map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key.includes('Date') ? 'date' : key.includes('Time') ? 'time' : 'text'}
                name={key}
                value={currentRecognition[key]}
                onChange={handleChange}
                className="shadow appearance-none border bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <div className="mb-4 col-span-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              name="status"
              value={currentRecognition.status}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-700 rounded w-64 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value={0}>Inactive</option>
              <option value={1}>Active</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 w-28 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isUpdating ? 'Update' : 'Add'}
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
      {isAdding || isUpdating ? (
        <RecognitionForm
          currentRecognition={currentRecognition}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isUpdating={isUpdating}
          companies={companies}
          employees={employees}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={handleAdd}
            >
              Add Recognition
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border text-black">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {Object.keys(currentRecognition).filter(key => key !== 'id').map((key) => (
                    <th key={key} className="py-2 px-4 border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recognitions.map((recognition) => (
                  <tr key={recognition.id}>
                    {Object.keys(currentRecognition).filter(key => key !== 'id').map((key) => (
                      <td key={key} className="py-2 px-4 border">{recognition[key]}</td>
                    ))}
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-yellow-500 text-white py-2 w-28 rounded"
                        onClick={() => handleUpdate(recognition)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RecognitionPage;


