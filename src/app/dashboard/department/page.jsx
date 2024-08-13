"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../ui/dashboard/footer/footer";
import { BASE_URL } from "../../../../config";
import { getCookie } from 'cookies-next';
export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentDepartment, setCurrentDepartment] = useState({
    companyId: "",
    companyName: "",
    departmentName: "",
    departmentId: "",
    status: "1",
  });
  
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  useEffect(() => {
    fetchDepartments();
    fetchCompanies();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/department/get-departments`,
        {
          headers: {
            Authorization:
                          "Bearer " + token,
          },
        }
      );
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/company/get-companies`, {
        headers: {
          Authorization:
                        "Bearer " + token,
        },
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
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
      ? `${BASE_URL}/department/update-department/${currentDepartment.id}`
      : `${BASE_URL}/department/add-department`;
    const method = isUpdate ? "PUT" : "POST";

    try {
      await axios({
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization:
                        "Bearer " + token,
        },
        data: currentDepartment,
      });
      toast.success(
        `Department successfully ${isUpdate ? "updated" : "added"}!`
      );
      setIsUpdating(false);
      setIsAdding(false);
      fetchDepartments();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddClick = () => {
    setCurrentDepartment({
      companyId: "",
      companyName: "",
      departmentName: "",
      departmentId: "",
      status: "1",
    });
    setIsAdding(true);
  };

  const handleUpdateClick = (department) => {
    setCurrentDepartment(department);
    setIsUpdating(true);
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = companies.find(
      (company) => company.companyId === e.target.value
    );
    setCurrentDepartment({
      ...currentDepartment,
      companyId: selectedCompany ? selectedCompany.companyId : "",
      companyName: selectedCompany ? selectedCompany.companyName : "",
    });
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(departments.length / itemsPerPage))
        return Math.ceil(departments.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      {!isAdding && !isUpdating && (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleAddClick}
            >
              Add Department
            </button>
          </div>
          <div className="relative flex items-center justify-center">
            {isLoading ? (
              <div className="absolute top-1/2 inset-0 flex flex-col items-center justify-center bg-opacity-50">
                <div
                  role="status"
                  className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"
                ></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2>
              </div>
            ) : (
              <div className="flex w-full flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto"></div>
                    <table className="min-w-full bg-white border">
                      <thead className="bg-gray-800 text-white border">
                        <tr>
                          <th className="py-2 border text-center">S.No</th>
                          <th className="py-2 border text-center">
                            Company ID
                          </th>
                          {/* <th className="py-2 border text-center">Company Name</th> */}
                          <th className="py-2 border text-center">
                            Department Name
                          </th>
                          <th className="py-2 border text-center">
                            Department ID
                          </th>
                          <th className="py-2 border text-center">Status</th>
                          <th className="py-2 border text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedDepartments.map((department, index) => (
                          <tr key={department.id} className="border-t">
                            <td className="py-2 px-4 text-black border text-center">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4 text-black border text-center">
                              {department.companyId}
                            </td>
                            {/* <td className="py-2 text-black border text-center">{department.companyName}</td> */}
                            <td className="py-2 px-4 text-black border text-center">
                              {department.departmentName}
                            </td>
                            <td className="py-2 px-4 text-black border text-center">
                              {department.departmentId}
                            </td>
                            <td className="py-2 px-4 text-black border text-center">
                              {department.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </td>
                            <td className="py-2 text-black text-center px-4">
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
                  </div>

                  <div className="mt-4 flex mb-4 justify-center items-center">
                    <button
                      onClick={() => handlePageChange(-1)}
                      disabled={currentPage === 1}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 rounded mr-2 focus:outline-none focus:shadow-outline"
                    >
                      «
                    </button>
                    <span className="text-white mx-4">
                      {" "}
                      {currentPage} /{" "}
                      {Math.ceil(departments.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={
                        currentPage ===
                        Math.ceil(departments.length / itemsPerPage)
                      }
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

      {(isAdding || isUpdating) && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">
            {isUpdating ? "Update Department" : "Add Department"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 bg-gray-100 p-4 rounded"
          >
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
                {companies.map((company) => (
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
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => {
                setIsAdding(false);
                setIsUpdating(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {!isLoading && <Footer />}
    </div>
  );
}
