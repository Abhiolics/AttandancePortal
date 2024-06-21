"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({
    id: '',
    companyName: '',
    companyId: '',
    status: 1,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get('https://attend.anujdwivedi.in/company/get-companies', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch companies');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleUpdate = (company) => {
    setCurrentCompany(company);
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentCompany({
      id: '',
      companyName: '',
      companyId: '',
      status: 1,
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    setCurrentCompany({
      ...currentCompany,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? 'put' : 'post',
        url: isUpdating
          ? `https://attend.anujdwivedi.in/company/update-company/${currentCompany.id}`
          : 'https://attend.anujdwivedi.in/company/add-company',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
        data: JSON.stringify(currentCompany),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchCompanies();
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsUpdating(false);
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={currentCompany.companyName}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company ID
            </label>
            <input
              type="text"
              name="companyId"
              value={currentCompany.companyId}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={currentCompany.status}
              onChange={handleChange}
              className="shadow appearance-none border bg-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
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
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={handleAdd}
            >
              Add Company
            </button>
          </div>
          <div className="relative min-h-screen flex items-center justify-center">
            {isLoading ? (
              <div className="absolute  inset-0 flex flex-col items-center justify-center  bg-transparent bg-opacity-50">
                <div role='status' className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2>
              </div>
            ) : (
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4 border text-center">S.No</th>
                    <th className="py-2 px-4 border">Company Name</th>
                    <th className="py-2 px-4 border">Company ID</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
                    <tr key={company.id}>
                      <td className="py-2 px-4 border text-black text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border text-black text-center">
                        {company.companyName}
                      </td>
                      <td className="py-2 px-4 border text-black text-center">
                        {company.companyId}
                      </td>
                      <td className="py-2 px-4 border text-black text-center">
                        {company.status === 1 ? 'Active' : 'Inactive'}
                      </td>
                      <td className="py-2 px-4 border text-black text-center">
                        <button
                          className="bg-yellow-500 text-white py-1 px-2 rounded"
                          onClick={() => handleUpdate(company)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}





