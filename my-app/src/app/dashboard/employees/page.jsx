"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [EPF, setEPF] = useState('');
  const [ESIC, setESIC] = useState('');
  const [device, setDevice] = useState('');
  const [holidayCalendar, setHolidayCalendar] = useState('');
  const [otApplicable, setOtApplicable] = useState('');
  const [mobilePolicy, setMobilePolicy] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [tag, setTag] = useState('');
  const [dateJoining, setDateJoining] = useState('');
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        'https://attend.anujdwivedi.in/employee/get-employees',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
          },
        }
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees');
    }
  };

  const handleUpdate = (employee) => {
    setId(employee.id);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setPhoneNumber(employee.phoneNumber);
    setImage(employee.image);
    setEmployeeId(employee.employeeId);
    setLocation(employee.location);
    setCompany(employee.company);
    setDepartment(employee.department);
    setDesignation(employee.designation);
    setAadharNumber(employee.aadharNumber);
    setEPF(employee.EPF);
    setESIC(employee.ESIC);
    setDevice(employee.device);
    setHolidayCalendar(employee.holidayCalendar);
    setOtApplicable(employee.otApplicable);
    setMobilePolicy(employee.mobilePolicy);
    setGender(employee.gender);
    setDob(employee.dob);
    setPersonalEmail(employee.personalEmail);
    setTag(employee.tag);
    setDateJoining(employee.dateJoining);
    setStatus(employee.status);

    setIsUpdating(true);
    setIsAdding(false); // Ensure add form is hidden
  };

  const handleAdd = () => {
    setId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setImage('');
    setEmployeeId('');
    setLocation('');
    setCompany('');
    setDepartment('');
    setDesignation('');
    setAadharNumber('');
    setEPF('');
    setESIC('');
    setDevice('');
    setHolidayCalendar('');
    setOtApplicable('');
    setMobilePolicy('');
    setGender('');
    setDob('');
    setPersonalEmail('');
    setTag('');
    setDateJoining('');
    setStatus(0);

    setIsAdding(true);
    setIsUpdating(false); // Ensure update form is hidden
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('image', image);
      formData.append('employeeId', employeeId);
      formData.append('location', location);
      formData.append('company', company);
      formData.append('department', department);
      formData.append('designation', designation);
      formData.append('aadharNumber', aadharNumber);
      formData.append('EPF', EPF);
      formData.append('ESIC', ESIC);
      formData.append('device', device);
      formData.append('holidayCalendar', holidayCalendar);
      formData.append('otApplicable', otApplicable);
      formData.append('mobilePolicy', mobilePolicy);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('personalEmail', personalEmail);
      formData.append('tag', tag);
      formData.append('dateJoining', dateJoining);
      formData.append('status', status);

      const config = {
        method: isUpdating ? 'put' : 'post',
        url: isUpdating
          ? `https://attend.anujdwivedi.in/employee/update-employee/${id}`
          : 'https://attend.anujdwivedi.in/employee/add-employee',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
        data: formData,
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to add/update employee');
      console.error('Error:', error);
    } finally {
      setIsAdding(false);
      setIsUpdating(false);
      setId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setImage('');
      setEmployeeId('');
      setLocation('');
      setCompany('');
      setDepartment('');
      setDesignation('');
      setAadharNumber('');
      setEPF('');
      setESIC('');
      setDevice('');
      setHolidayCalendar('');
      setOtApplicable('');
      setMobilePolicy('');
      setGender('');
      setDob('');
      setPersonalEmail('');
      setTag('');
      setDateJoining('');
      setStatus(0);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <form
          onSubmit={handleSubmit}
          className="mt-4 bg-gray-100 p-4 rounded"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Aadhar Number
              </label>
              <input
                type="number"
                name="aadharNumber"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                EPF
              </label>
              <input
                type="text"
                name="EPF"
                value={EPF}
                onChange={(e) => setEPF(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ESIC
              </label>
              <input
                type="text"
                name="ESIC"
                value={ESIC}
                onChange={(e) => setESIC(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Device
              </label>
              <input
                type="text"
                name="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Holiday Calendar
              </label>
              <input
                type="text"
                name="holidayCalendar"
                value={holidayCalendar}
                onChange={(e) => setHolidayCalendar(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                OT Applicable
              </label>
              <input
                type="text"
                name="otApplicable"
                value={otApplicable}
                onChange={(e) => setOtApplicable(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile Policy
              </label>
              <input
                type="text"
                name="mobilePolicy"
                value={mobilePolicy}
                onChange={(e) => setMobilePolicy(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                DOB
              </label>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Personal Email
              </label>
              <input
                type="email"
                name="personalEmail"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tag
              </label>
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date Joining
              </label>
              <input
                type="date"
                name="dateJoining"
                value={dateJoining}
                onChange={(e) => setDateJoining(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-5 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isUpdating ? 'Update' : 'Add'} 
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setIsAdding(false);
                setIsUpdating(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className='flex justify-end items-center'>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Employee
          </button> </div>
          <table className="min-w-full bg-white">
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className="py-2 px-4 border border-gray-2000 ">ID</th>
                <th className="py-2 px-4 border border-gray-200 ">First Name</th>
                <th className="py-2 px-4 border border-gray-200 ">Last Name</th>
                <th className="py-2 px-4 border border-gray-200 ">Email</th>
                <th className="py-2 px-4 border border-gray-200 ">Phone Number</th>
                <th className="py-2 px-4 border border-gray-200 ">Employee ID</th>
                <th className="py-2 px-4 border border-gray-200 ">Company</th>
                <th className="py-2 px-4 border border-gray-200 ">Designation</th>
                <th className="py-2 px-4 border border-gray-200 ">Department</th>
                <th className="py-2 px-4 border border-gray-200 ">DOB</th>
                <th className="py-2 px-4 border border-gray-200 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className='text-center'>
                  <td className="py-2 px-4 text-black border border-gray-200">{employee.id}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.firstName}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.lastname}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.email}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.phoneNumber}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.employeeId}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.company}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.designation}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.department}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">{employee.dob}</td>
                  <td className="py-2 px-4 border text-black border-gray-200">
                    <button
                      onClick={() => handleUpdate(employee)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      View 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;








