"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../ui/dashboard/footer/footer';
import {BASE_URL} from "../../../../config";

const VisitorPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/recognition/get-visitors`,
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        }
      };
      const response = await axios.request(config);
      setVisitors(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch visitors');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleAdd = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setCompany('');
    setMeetingPurpose('');
    setContactPerson('');
    setRemarks('');
    setStatus(1);
    setIsAdding(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newVisitor = {
      name,
      phoneNumber,
      email,
      company,
      meetingPurpose,
      contactPerson,
      remarks,
      status,
    };
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/recognition/add-visitor`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE'
        },
        data: JSON.stringify(newVisitor)
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      fetchVisitors();
      setIsAdding(false);
    } catch (error) {
      toast.error('Failed to add visitor');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  
  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(visitors.length / itemsPerPage)) return Math.ceil(visitors.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedVisitors = visitors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding ? (
        <VisitorForm
          handleSubmit={handleAddSubmit}
          handleCancel={handleCancel}
          setName={setName}
          setPhoneNumber={setPhoneNumber}
          setCompany={setCompany}
          setEmail={setEmail}
          setMeetingPurpose={setMeetingPurpose}
          setContactPerson={setContactPerson}
          setRemarks={setRemarks}
          name={name}
          phoneNumber={phoneNumber}
          email={email}
          company={company}
          meetingPurpose={meetingPurpose}
          contactPerson={contactPerson}
          remarks={remarks}
        />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAdd}
            >
              Add Visitor
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
          <div class="flex flex-col overflow-x-auto">
          <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto"></div>   
          <table className="min-w-full bg-white border text-black">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border text-center">S.No</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Phone Number</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Company</th>
                <th className="py-2 px-4 border">Meeting Purpose</th>
                <th className="py-2 px-4 border">Contact Person</th>
                <th className="py-2 px-4 border">Remarks</th>
                <th className="py-2 px-4 border">Status</th>
                
                
              </tr>
            </thead>
            <tbody>
              {displayedVisitors.map((visitor, index) => (
                <tr key={visitor.id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{visitor.name}</td>
                  <td className="py-2 px-4 border">{visitor.phoneNumber}</td>
                  <td className="py-2 px-4 border">{visitor.email}</td>
                  <td className="py-2 px-4 border">{visitor.company}</td>
                  <td className="py-2 px-4 border">{visitor.meetingPurpose}</td>
                  <td className="py-2 px-4 border">{visitor.contactPerson}</td>
                  <td className="py-2 px-4 border">{visitor.remarks}</td>
                  <td className="py-2 px-4 border">{visitor.status === 1 ? 'Active' : 'Inactive'}</td>
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
  <span className="text-white mx-4"> {currentPage} / {Math.ceil(visitors.length / itemsPerPage)}</span>
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === Math.ceil(visitors.length / itemsPerPage)}
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

const VisitorForm = ({ 
  handleSubmit, 
  handleCancel,
  setName,
  setEmail,
  setPhoneNumber,
  setCompany,
  setContactPerson,
  setMeetingPurpose,
  setRemarks,
  name,
  phoneNumber,
  email,
  company,
  meetingPurpose,
  contactPerson,
  remarks
 }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Meeting Purpose
          </label>
          <input
            type="text"
            value={meetingPurpose}
            onChange={(e) => setMeetingPurpose(e.target.value)}
            className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Person
          </label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Remarks
          </label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 w-28 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
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

export default VisitorPage;
