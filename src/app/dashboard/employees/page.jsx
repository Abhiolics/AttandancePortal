"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
import Footer from "../../ui/dashboard/footer/footer";
import { format, parseISO } from "date-fns";
import { BASE_URL } from "../../../../config";
import Fuse from "fuse.js";
import { getCookie } from 'cookies-next';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const [employee, setEmployee] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Image: "",
    EmployeeId: "",
    Location: "",
    companyId: "",
    departmentId: "",
    designationId: "",
    AadharNumber: "",
    EPF: "",
    ESIC: "",
    Device: "",
    HolidayCalendar: "",
    OTApplicable: "",
    MobilePolicy: "",
    Gender: "Male",
    dob: "",
    PersonalEmail: "",
    Tag: "",
    dateJoining: "",
    Status: 0,
  });

  const [options, setOptions] = useState({
    company: [],
    department: [],
    designation: [],
  });
  
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  useEffect(() => {
    if (searchTerm === "") {
      setEmployees(data);
      return;
    } else {
      const fuse = new Fuse(employees, {
        keys: ["firstName", "lastName", "email"],
      });

      const results = fuse.search(searchTerm);

      console.log(results);

      setEmployees(results.map((result) => result.item));
    }
  }, [searchTerm]);

  const fetchEmployees = async () => {
    console.log(token);
    try {
      const response = await axios.get(`${BASE_URL}/employee/get-employees`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setEmployees(response.data.data);
      setData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOptions = async (url, key) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOptions((prev) => ({ ...prev, [key]: response.data.data }));
    } catch (error) {
      toast.error(`Failed to fetch ${key} options`);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchOptions(`${BASE_URL}/company/get-companies`, "company");
  }, []);

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    console.log(name);
    console.log(value);

    if (name === "company") {
      setEmployee((prev) => ({
        ...prev,
        companyId: value,
        departmentId: "",
        designationId: "",
      }));
      try {
        const departmentResponse = await axios.get(
          `${BASE_URL}/department/get-department/${value}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const designationResponse = await axios.get(
          `${BASE_URL}/designation/get-designation/${value}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setOptions((prev) => ({
          ...prev,
          department: departmentResponse.data.data,
          designation: designationResponse.data.data,
        }));
      } catch (error) {
        toast.error("Failed to fetch department or designation options");
      }
    } else if (name === "department") {
      setEmployee((prev) => ({
        ...prev,
        departmentId: value,
        designationId: "",
      }));
    } else if (name === "designation") {
      setEmployee((prev) => ({ ...prev, designationId: value }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    }

    if (name === "company") {
      try {
        const departmentResponse = await axios.get(
          `${BASE_URL}/department/get-department/${value}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const designationResponse = await axios.get(
          `${BASE_URL}/designation/get-designation/${value}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setOptions((prev) => ({
          ...prev,
          department: departmentResponse.data.data,
          designation: designationResponse.data.data,
        }));
      } catch (error) {
        toast.error("Failed to fetch department or designation options");
      }
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const parsedDate = parseISO(value);
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    console.log(name);
    setEmployee((prev) => ({ ...prev, [name]: formattedDate }));
  };

  const handleAadharChange = (e) => {
    const aadhar = e.target.value;
    if (/^[0-9\b]{0,12}$/.test(aadhar)) {
      setEmployee((prev) => ({ ...prev, AadharNumber: aadhar }));
    }
  };

  const handleAction = (action, emp = {}) => {
    if (action === "update") {
      setEmployee(emp);
      setIsUpdating(true);
      setIsAdding(false);
    } else {
      setEmployee({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Image: "",
        EmployeeId: "",
        Location: "",
        companyId: "",
        departmentId: "",
        designationId: "",
        AadharNumber: "",
        EPF: "",
        ESIC: "",
        Device: "",
        HolidayCalendar: "",
        OTApplicable: "",
        MobilePolicy: "",
        Gender: "Male",
        dob: "",
        PersonalEmail: "",
        Tag: "",
        dateJoining: "",
        Status: 0,
      });
      setIsAdding(true);
      setIsUpdating(false);
    }
  };

  function toCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.FirstName ||
      !employee.LastName ||
      !employee.Email ||
      !employee.EmployeeId
    ) {
      toast.error(
        "First name, Last name, email, and employee ID are required fields"
      );
      return;
    }
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(employee.PhoneNumber)) {
      toast.error("Phone number must be a 10-digit number");
      return;
    }

    if (employee.AadharNumber.length !== 12) {
      toast.error("Aadhar number must be 12 digits");
      return;
    }

    if (employee.companyId === "" || employee.departmentId === "") {
      toast.error("Company and department are required fields");
      return;
    }

    if (employee.designationId === "") {
      toast.error("Designation is a required field");
      return;
    }

    if (employee.dob === "" || employee.dateJoining === "") {
      toast.error("Date of birth and date of joining are required fields");
      return;
    }

    const keysToExclude = ["EPF", "ESIC"];

    const formData = new FormData();

    Object.keys(employee).forEach((key) => {
      let finalKey = keysToExclude.includes(key) ? key : toCamelCase(key);
      formData.append(finalKey, employee[key]);
      console.log(finalKey, employee[key]);
    });

    const requestOptions = {
      method: isUpdating ? "PUT" : "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4OTcwNDA4fQ.wzuror3RQWipHbQ9Sfc0FqghVpzNVwsKTC2Eob_uYB8",
      },
      body: formData,
    };

    const url = isUpdating
      ? `${BASE_URL}/employee/update-employee/${employee.id}`
      : `${BASE_URL}/employee/add-employee`;

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      if (result.status === false) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setIsAdding(false);
        setIsUpdating(false);
        fetchEmployees();
      }
    } catch (error) {
      toast.error("Failed to Update employee");
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(employees.length / itemsPerPage))
        return Math.ceil(employees.length / itemsPerPage);
      return newPage;
    });
  };

  const displayedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
          <div className="grid grid-cols-3 gap-4">
            {[
              "FirstName",
              "LastName",
              "Email",
              "PhoneNumber",
              "EmployeeId",
              "AadharNumber",
              "Location",
              "EPF",
              "ESIC",
              "Device",
              "HolidayCalendar",
              "OtApplicable",
              "MobilePolicy",
              "PersonalEmail",
              "Tag",
            ].map((field) => {
              const camelCaseField =
                field.charAt(0).toLowerCase() + field.slice(1);
              return (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                    {field.split(/(?=[A-Z])/).join(" ")}
                  </label>
                  <input
                    type={
                      ["PhoneNumber", "AadharNumber"].includes(field)
                        ? "tel"
                        : ["Email", "PersonalEmail"].includes(field)
                        ? "email"
                        : "text"
                    }
                    required={[
                      "FirstName",
                      "LastName",
                      "Email",
                      "PhoneNumber",
                      "EmployeeId",
                    ].includes(field)}
                    name={field}
                    maxLength={
                      field === "PhoneNumber"
                        ? 10
                        : field === "AadharNumber"
                        ? 12
                        : 100
                    }
                    value={employee[field]}
                    defaultValue={
                      isUpdating ? employee[camelCaseField] : employee[field]
                    }
                    onChange={
                      field === "AadharNumber"
                        ? handleAadharChange
                        : handleInputChange
                    }
                    className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              );
            })}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {["company", "department", "designation"].map((opt) => {
              let option = "";
              if (opt === "company") {
                option = "companyId";
              } else if (opt === "department") {
                option = "departmentId";
              } else if (opt === "designation") {
                option = "designationId";
              }
              const camelCaseField =
                option.charAt(0).toLowerCase() + option.slice(1);
              return (
                <div key={opt} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </label>
                  <select
                    name={opt}
                    value={employee[opt]}
                    onChange={handleInputChange}
                    className="border bg-gray-600 rounded w-full py-2 px-3 text-white leading-tight"
                    defaultValue={
                      isUpdating ? employee[camelCaseField] : employee[opt]
                    }
                  >
                    <option value="">
                      Select {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                    {options[opt].map((item) => (
                      <option key={item.id} value={item[`${opt}Id`]}>
                        {item[`${opt}Name`]}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={employee.Gender}
                onChange={handleInputChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                // required
              >
                <option value="Male">Male</option>

                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={employee.dob}
                onChange={handleDateChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                // required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date Joining
              </label>
              <input
                type="date"
                name="dateJoining"
                value={employee.dateJoining}
                onChange={handleDateChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                // required
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-28 rounded focus:outline-none focus:shadow-outline"
            >
              {isUpdating ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false) || setIsUpdating(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 w-28 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4 ">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="shadow appearance-none border bg-slate-600 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => handleAction("add")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Employee
            </button>
          </div>
          <div className="relative  flex items-center justify-center">
            {isLoading ? (
              <div className="absolute  inset-0 flex flex-col items-center justify-center  bg-transparent bg-opacity-50">
                <div
                  role="status"
                  className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"
                ></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2>
              </div>
            ) : (
              <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto"></div>
                    <table className="min-w-full bg-white mt-4">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Sr. No.
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            First Name
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Last Name
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Email
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Employee ID
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Company
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Designation
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Department
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            DOB
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Phone Number
                          </th>
                          <th className="py-2 px-4 border-b border text-white bg-gray-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center text-black py-4"
                            >
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          displayedEmployees.map((emp, i) => (
                            <tr key={emp.id}>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {i + 1}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.firstName}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.lastName}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.email}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.employeeId}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.companyId}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.designationId}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.departmentId}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {format(parseISO(emp.dob), "dd/MM/yyyy")}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.phoneNumber}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                <button
                                  onClick={() => handleAction("update", emp)}
                                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 w-28 rounded focus:outline-none focus:shadow-outline mr-2"
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
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
                      {Math.ceil(employees.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={
                        currentPage ===
                        Math.ceil(employees.length / itemsPerPage)
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
        </div>
      )}
      {!isLoading && <Footer />}
    </div>
  );
}
