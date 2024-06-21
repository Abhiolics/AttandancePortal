'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    companyId: '',
    companyName: '',
    departmentName: '',
    departmentId: '',
    status: '1',
  });

  useEffect(() => {
    fetchDepartments();
    fetchCompanies();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://attend.anujdwivedi.in/department/get-departments', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      });
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://attend.anujdwivedi.in/company/get-companies', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment({
      ...currentDepartment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUpdate = !!currentDepartment.id;
    const url = isUpdate 
      ? `https://attend.anujdwivedi.in/department/update-department/${currentDepartment.id}` 
      : 'https://attend.anujdwivedi.in/department/add-department';
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        },
        data: currentDepartment
      });
      toast.success(`Department successfully ${isUpdate ? 'updated' : 'added'}!`);
      setIsUpdating(false);
      setIsAdding(false);
      fetchDepartments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddClick = () => {
    setCurrentDepartment({
      companyId: '',
      companyName: '',
      departmentName: '',
      departmentId: '',
      status: '1',
    });
    setIsAdding(true);
  };

  const handleUpdateClick = (department) => {
    setCurrentDepartment(department);
    setIsUpdating(true);
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = companies.find(company => company.companyId === e.target.value);
    setCurrentDepartment({
      ...currentDepartment,
      companyId: selectedCompany ? selectedCompany.companyId : '',
      companyName: selectedCompany ? selectedCompany.companyName : '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      {!isAdding && !isUpdating && (
        <>
          <div className='flex justify-end mb-4'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleAddClick}>
              Add Department
            </button>
          </div>

          <table className="min-w-full bg-white border">
            <thead className='bg-gray-800 text-white border'>
              <tr>
                <th className="py-2 border text-center">S.No</th>
                <th className="py-2 border text-center">Company ID</th>
                <th className="py-2 border text-center">Company Name</th>
                <th className="py-2 border text-center">Department Name</th>
                <th className="py-2 border text-center">Department ID</th>
                <th className="py-2 border text-center">Status</th>
                <th className="py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={department.id} className="border-t">
                  <td className="py-2 text-black border text-center">{index + 1}</td>
                  <td className="py-2 text-black border text-center">{department.companyId}</td>
                  <td className="py-2 text-black border text-center">{department.companyName}</td>
                  <td className="py-2 text-black border text-center">{department.departmentName}</td>
                  <td className="py-2 text-black border text-center">{department.departmentId}</td>
                  <td className="py-2 text-black border text-center">
                    {department.status === 'active' ? 'Active' : 'Inactive'}
                  </td>
                  <td className="py-2 text-black text-center">
                    <button
                      className="bg-yellow-500 text-white w-28 py-1 rounded"
                      onClick={() => handleUpdateClick(department)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(isAdding || isUpdating) && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">{isUpdating ? 'Update Department' : 'Add Department'}</h2>
          <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
            <div className="mb-2">
              <label className="block text-black">Company</label>
              <select
                name="companyId"
                value={currentDepartment.companyId}
                onChange={handleCompanyChange}
                className="border p-2 w-full bg-gray-600"
                required
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.companyId}>
                    {company.companyName} - {company.companyId}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-black">Department Name</label>
              <input
                type="text"
                name="departmentName"
                value={currentDepartment.departmentName}
                onChange={handleInputChange}
                className="border p-2 w-full bg-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Department ID</label>
              <input
                type="text"
                name="departmentId"
                value={currentDepartment.departmentId}
                onChange={handleInputChange}
                className="border p-2 w-full bg-gray-600"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Status</label>
              <select
                name="status"
                value={currentDepartment.status}
                onChange={handleInputChange}
                className="border p-2 w-full bg-gray-600"
                required
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => { setIsAdding(false); setIsUpdating(false); }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}




