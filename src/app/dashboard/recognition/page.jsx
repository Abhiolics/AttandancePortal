
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../ui/dashboard/footer/footer';
import {BASE_URL} from "../../../../config";
import { getCookie } from 'cookies-next';
const RecognitionPage = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [currentRecognition, setCurrentRecognition] = useState({
    companyId: '',
    employeeId: '',
    device: '',
    recognitionDate: '',
    recognitionTime: '',
    remarks: '',
    status: 0,
  });
  
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
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
        url: `${BASE_URL}/recognition/get-employees`,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
      const response = await axios.request(config);
      setRecognitions(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch recognitions');
    } finally {
      setIsLoading(false); 
    }
  };

  const fetchCompanies = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/company/get-companies`,
        headers: {
          'Authorization':             "Bearer " + token,
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
        url: `${BASE_URL}/employee/get-employees`,
        headers: {
          'Authorization':             "Bearer " + token,
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
      companyId: '',
      employeeId: '',
      device: '',
      recognitionDate: '',
      recognitionTime: '',
      remarks: '',
      status: "0",
    });
    setIsAdding(true);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    console.log("name", name)
    console.log("value", value)
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
          ?`${BASE_URL}/recognition/update-employee/${currentRecognition.id}`
          : `${BASE_URL}/recognition/add-employee`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':             "Bearer " + token,
        },
        data: JSON.stringify(currentRecognition)
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchRecognitions();
      setIsUpdating(false);
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to Update recognition');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setIsAdding(false);
  };


  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(recognitions.length / itemsPerPage)) return Math.ceil(recognitions.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedRecoginition = recognitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <RecognitionForm
          currentRecognition={currentRecognition}
          setCurrentRecognition={setCurrentRecognition}
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
          <div className="relative  flex items-center justify-center">
            {isLoading ? (
              <div className="absolute  inset-0 flex flex-col items-center justify-center  bg-transparent bg-opacity-50">
                <div role='status' className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2>
              </div>
            ) : (
              <div className="flex min-w-full flex-col ">
              <div className="sm:-mx-6  lg:-mx-8">
        <div className="inline-block min-w-full  py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto"></div>
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
                {displayedRecoginition.map((recognition) => (
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
          <div className="mt-4 flex mb-4 justify-center items-center">
  <button
    onClick={() => handlePageChange(-1)}
    disabled={currentPage === 1}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 rounded mr-2 focus:outline-none focus:shadow-outline"
  >
    «
  </button>
  <span className="text-white mx-4"> {currentPage} / {Math.ceil(recognitions.length / itemsPerPage)}</span>
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === Math.ceil(recognitions.length / itemsPerPage)}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 rounded focus:outline-none focus:shadow-outline"
  >
   »
  </button>
</div>
          </div>
          </div>
            )}
            </div>
        </>
      )}
       {!isLoading && <Footer />}
    </div>
  );
};

const RecognitionForm = ({ currentRecognition, setCurrentRecognition, handleChange, handleSubmit, handleCancel, isUpdating, companies, employees }) => {
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
        {Object.keys(currentRecognition).filter(key => key !== 'id' && key !== 'companyId' && key !== 'employeeId').map((key, index) => (
          <div className="mb-4" key={index}>
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

export default RecognitionPage;


