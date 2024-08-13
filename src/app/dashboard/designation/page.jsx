'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../ui/dashboard/footer/footer';
import {BASE_URL} from "../../../../config";
import { getCookie } from 'cookies-next';
export default function Designations() {
  const [designations, setDesignations] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentDesignation, setCurrentDesignation] = useState({
    id: '',
    companyId: '',
    designationName: '',
    designationId: '',
    status: 1,
  });
  const [companies, setCompanies] = useState([]);
  
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  useEffect(() => {
    fetchDesignations();
    fetchCompanies();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/designation/get-designations`, {
        headers: {
          Authorization:             "Bearer " + token,
        },
      });
      setDesignations(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/company/get-companies`, {
        headers: {
          Authorization:             "Bearer " + token,
        },
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (designation) => {
    setCurrentDesignation(designation);
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentDesignation({
      id: '',
      companyId: '',
      designationName: '',
      designationId: '',
      status: 1,
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    setCurrentDesignation({
      ...currentDesignation,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = companies.find(company => company.companyId === e.target.value);
    setCurrentDesignation({
      ...currentDesignation,
      companyId: selectedCompany ? selectedCompany.companyId : '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? 'put' : 'post',
        url: isUpdating
          ? `${BASE_URL}/designation/update-designation/${currentDesignation.id}`
          : `${BASE_URL}/designation/add-designation`,
        headers: {
          'Content-Type': 'application/json',
          Authorization:             "Bearer " + token,
        },
        data: JSON.stringify(currentDesignation),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchDesignations();
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsUpdating(false);
      setIsAdding(false);
    }
  };


  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(designations.length / itemsPerPage)) return Math.ceil(designations.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedDesignations = designations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
            <select
              name="companyId"
              value={currentDesignation.companyId}
              onChange={handleCompanyChange}
              className="shadow appearance-none border bg-gray-600  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.companyId}>
                  {company.companyName} - {company.companyId}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Designation Name</label>
            <input
              type="text"
              name="designationName"
              value={currentDesignation.designationName}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-600  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Designation ID</label>
            <input
              type="text"
              name="designationId"
              value={currentDesignation.designationId}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-600  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              name="status"
              value={currentDesignation.status}
              onChange={handleChange}
              className="shadow appearance-none bg-gray-600 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 w-28 rounded focus:outline-none focus:shadow-outline"
            >
              {isUpdating ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 w-28 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setIsUpdating(false);
                setIsAdding(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-end items-center mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAdd}
            >
              Add Designation
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
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border text-center">S.No</th>
                <th className="py-2 px-4 border">Company Name</th>
                <th className="py-2 px-4 border">Designation Name</th>
                <th className="py-2 px-4 border">Designation ID</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedDesignations.map((designation, index) => (
                <tr key={designation.id}>
                  <td className="py-2 px-4 border text-black text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-black text-center">
                    {companies.find(company => company.companyId === designation.companyId)?.companyName} 
                  </td>
                  <td className="py-2 px-4 border text-black text-center">{designation.designationName}</td>
                  <td className="py-2 px-4 border text-black text-center">{designation.designationId}</td>
                  <td className="py-2 px-4 border text-black text-center">
                    {designation.status === 1 ? 'Active' : 'Inactive'}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">
                    <button
                      className="bg-yellow-500 text-white py-1 w-28 rounded"
                      onClick={() => handleUpdate(designation)}
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
           <span className="text-white mx-4"> {currentPage} / {Math.ceil(designations.length / itemsPerPage)}</span>
           <button
             onClick={() => handlePageChange(1)}
             disabled={currentPage === Math.ceil(designations.length / itemsPerPage)}
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
}







