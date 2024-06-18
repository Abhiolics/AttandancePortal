"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HolidayPage() {
  const [holidays, setHolidays] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({
    id: '',
    accessType: '',
    calendarId: '',
    calendarName: '',
    effectiveDate: '', // Date string from API
    holidayDetails: {
      srNo: '',
      holidayName: '',
      Date: '', // Date string from API
    },
    status: '',
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('https://attend.anujdwivedi.in/holiday/get-holidays', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
      });
      // Process holidays to format dates and set in state
      const formattedHolidays = response.data.data.map(holiday => ({
        ...holiday,
        effectiveDate: formatDate(holiday.effectiveDate),
        holidayDetails: {
          ...holiday.holidayDetails,
          Date: formatDate(holiday.holidayDetails.Date),
        },
      }));
      setHolidays(formattedHolidays);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleUpdate = (holiday) => {
    setCurrentHoliday(holiday);
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentHoliday({
      id: '',
      accessType: '',
      calendarId: '',
      calendarName: '',
      effectiveDate: '',
      holidayDetails: {
        srNo: '',
        holidayName: '',
        Date: '',
      },
      status: '',
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['srNo', 'holidayName', 'Date'].includes(name)) {
      setCurrentHoliday((prevState) => ({
        ...prevState,
        holidayDetails: {
          ...prevState.holidayDetails,
          [name]: value,
        },
      }));
    } else {
      setCurrentHoliday({
        ...currentHoliday,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? 'put' : 'post',
        url: isUpdating
          ? `https://attend.anujdwivedi.in/holiday/update-holiday/${currentHoliday.id}`
          : 'https://attend.anujdwivedi.in/holiday/add-holiday',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
        data: JSON.stringify(currentHoliday),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchHolidays();
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
              Access Type
            </label>
            <input
              type="text"
              name="accessType"
              value={currentHoliday.accessType}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Calendar ID
            </label>
            <input
              type="text"
              name="calendarId"
              value={currentHoliday.calendarId}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Calendar Name
            </label>
            <input
              type="text"
              name="calendarName"
              value={currentHoliday.calendarName}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Effective Date
            </label>
            <input
              type="text" // Change type to text for effectiveDate to display properly
              name="effectiveDate"
              value={currentHoliday.effectiveDate}
              readOnly // Readonly to prevent editing
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Holiday Details
            </label>
            <div className="mb-2">
              <label className="block text-gray-500">Sr. No</label>
              <input
                type="number"
                name="srNo"
                value={currentHoliday.holidayDetails.srNo}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-500">Holiday Name</label>
              <input
                type="text"
                name="holidayName"
                value={currentHoliday.holidayDetails.holidayName}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-500">Date</label>
              <input
                type="text" // Change type to text for Date to display properly
                name="Date"
                value={currentHoliday.holidayDetails.Date}
                readOnly // Readonly to prevent editing
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={currentHoliday.status}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              Add Holiday
            </button>
          </div>
          <table className="min-w-full bg-white border">
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className="py-2 px-4 border  text-center">S.No</th>
                <th className="py-2 px-4 border ">Access Type</th>
                <th className="py-2 px-4 border ">Calendar ID</th>
                <th className="py-2 px-4 border ">Calendar Name</th>
                <th className="py-2 px-4 border ">Effective Date</th>
                <th className="py-2 px-4 border ">Holiday Details</th>
                <th className="py-2 px-4 border ">Status</th>
                <th className="py-2 px-4 border ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={holiday.id}>
                  <td className="py-2 px-4 border text-black text-center">{index + 1}</td>
                  {/* <td className="py-2 px-4 border text-black text-center">{holiday.id}</td> */}
                  <td className="py-2 px-4 border text-black text-center">{holiday.accessType}</td>
                  <td className="py-2 px-4 border text-black text-center">{holiday.calendarId}</td>
                  <td className="py-2 px-4 border text-black text-center">{holiday.calendarName}</td>
                  <td className="py-2 px-4 border text-black text-center">{holiday.effectiveDate}</td>
                  <td className="py-2 px-4 border text-black text-center">
                    {`Sr No: ${holiday.holidayDetails.srNo}, Name: ${holiday.holidayDetails.holidayName}, Date: ${holiday.holidayDetails.Date}`}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">{holiday.status}</td>
                  <td className="py-2 px-4 border text-black text-center">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded"
                      onClick={() => handleUpdate(holiday)}
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
    </div>
  );
}



