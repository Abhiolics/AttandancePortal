"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    image: '',
    employeeId: '',
    location: '',
    company: '',
    department: '',
    designation: '',
    aadharNumber: '',
    EPF: '',
    ESIC: '',
    device: '',
    holidayCalendar: '',
    otApplicable: '',
    mobilePolicy: '',
    gender: '',
    dob: '',
    personalEmail: '',
    tag: '',
    dateJoining: '',
    status: 0,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleUpdate = (employee) => {
    setCurrentEmployee(employee);
    setIsUpdating(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setCurrentEmployee({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      image: '',
      employeeId: '',
      location: '',
      company: '',
      department: '',
      designation: '',
      aadharNumber: '',
      EPF: '',
      ESIC: '',
      device: '',
      holidayCalendar: '',
      otApplicable: '',
      mobilePolicy: '',
      gender: '',
      dob: '',
      personalEmail: '',
      tag: '',
      dateJoining: '',
      status: 0,
    });
    setIsAdding(true);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(currentEmployee).forEach(key => {
        formData.append(key, currentEmployee[key]);
      });

      const config = {
        method: isUpdating ? 'put' : 'post',
        maxBodyLength: Infinity,
        url: isUpdating
          ? `https://attend.anujdwivedi.in/employee/update-employee/${currentEmployee.id}`
          : 'https://attend.anujdwivedi.in/employee/add-employee',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        },
        data: formData
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchEmployees();
      setIsUpdating(false);
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to add/update employee');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setIsAdding(false);
  };

  const EmployeeForm = ({ currentEmployee, handleChange, handleSubmit, handleCancel, isUpdating }) => {
    const fields = Object.keys(currentEmployee).filter(key => key !== 'id');

    return (
      <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
        <div className="grid grid-cols-3 gap-4">
          {fields.map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === 'dob' ? 'date' : 'text'}
                name={key}
                value={currentEmployee[key]}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
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
        <EmployeeForm
          currentEmployee={currentEmployee}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isUpdating={isUpdating}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={handleAdd}
            >
              Add Employee
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border text-black">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {Object.keys(currentEmployee).filter(key => key !== 'id').map((key) => (
                    <th key={key} className="py-2 px-4 border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    {Object.keys(currentEmployee).filter(key => key !== 'id').map((key) => (
                      <td key={key} className="py-2 px-4 border">{employee[key]}</td>
                    ))}
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-yellow-500 text-white py-2 w-28 rounded mr-2"
                        onClick={() => handleUpdate(employee)}
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

export default EmployeePage;





