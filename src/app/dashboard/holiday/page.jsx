'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../ui/dashboard/footer/footer';
import {BASE_URL} from "../../../../config";

export default function HolidayPage() {
  const [holidays, setHolidays] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentHoliday, setCurrentHoliday] = useState({
    accessType: '',
    calendarId: '',
    calendarName: '',
    effectiveDate: '',
    holidayDetails: {
      srNo: '',
      holidayName: '',
      Date: '',
    },
    status: 'Inactive',
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const handleDateChange = (e, field) => {
    const formattedDate = e.target.value;
    if (field === 'effectiveDate') {
      setCurrentHoliday({
        ...currentHoliday,
        effectiveDate: formattedDate,
      });
    } else {
      setCurrentHoliday((prevState) => ({
        ...prevState,
        holidayDetails: {
          ...prevState.holidayDetails,
          Date: formattedDate,
        },
      }));
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/holiday/get-holidays`, {
        headers: {
          Authorization:             "Bearer " + token,
        },
      });
      setHolidays(response.data.data);
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false); 
    }
  };

  const handleUpdate = (holiday) => {
    setCurrentHoliday({
      ...holiday,
      status: holiday.status === '1' ? 'Active' : 'Inactive',
      effectiveDate: holiday.effectiveDate ? holiday.effectiveDate.split('T')[0] : '',
      holidayDetails: {
        ...holiday.holidayDetails,
        Date: holiday.holidayDetails.Date ? holiday.holidayDetails.Date.split('T')[0] : '',
      },
    });
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentHoliday({
      accessType: '',
      calendarId: '',
      calendarName: '',
      effectiveDate: '',
      holidayDetails: {
        srNo: '',
        holidayName: '',
        Date: '',
      },
      status: 'Inactive',
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
          ? `${BASE_URL}/holiday/update-holiday/${currentHoliday.id}`
          : `${BASE_URL}/holiday/add-holiday`,
        headers: {
          'Content-Type': 'application/json',
          Authorization:             "Bearer " + token,
        },
        data: JSON.stringify({
          accessType: currentHoliday.accessType,
          calendarId: currentHoliday.calendarId,
          calendarName: currentHoliday.calendarName,
          effectiveDate: currentHoliday.effectiveDate,
          holidayDetails: {
            srNo: `${currentHoliday.holidayDetails.srNo}`,
            holidayName: currentHoliday.holidayDetails.holidayName,
            Date: currentHoliday.holidayDetails.Date,
          },
          status: currentHoliday.status === 'Active' ? '1' : '0',
        }),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchHolidays();
    } catch (error) {
      console.log(error.response);
      console.error(error);
    } finally {
      setIsUpdating(false);
      setIsAdding(false);
    }
  };

  useEffect(() => {
    console.log(currentHoliday);
  }, [currentHoliday]);


  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(holidays.length / itemsPerPage)) return Math.ceil(holidays.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedHolidays = holidays.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
              type="date"
              name="effectiveDate"
              value={currentHoliday.effectiveDate}
              onChange={(e) => handleDateChange(e, 'effectiveDate')}
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
                type="date"
                name="Date"
                value={currentHoliday.holidayDetails.Date}
                onChange={(e) => handleDateChange(e, 'Date')}
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
              className="shadow appearance-none border bg-slate-600 rounded w-64 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className="py-2 px-4 border text-center">S.No</th>
                <th className="py-2 px-4 border">Access Type</th>
                <th className="py-2 px-4 border">Calendar ID</th>
                <th className="py-2 px-4 border">Calendar Name</th>
                <th className="py-2 px-4 border">Effective Date</th>
                <th className="py-2 px-4 border">Holiday Details</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedHolidays.map((holiday, index) => {
                let holidayDetailJSON = JSON.parse(holiday.holidayDetails);
                return (
                  <tr key={holiday.id}>
                    <td className="py-2 px-4 border text-black text-center">{index + 1}</td>
                    <td className="py-2 px-4 border text-black text-center">{holiday.accessType}</td>
                    <td className="py-2 px-4 border text-black text-center">{holiday.calendarId}</td>
                    <td className="py-2 px-4 border text-black text-center">{holiday.calendarName}</td>
                    <td className="py-2 px-4 border text-black text-center">{new Date(holiday.effectiveDate).toLocaleDateString('en-US')}</td>
                    <td className="py-2 px-4 border text-black text-center">
                      {`Sr No: ${holidayDetailJSON.srNo}, Name: ${holidayDetailJSON.holidayName}, Date: ${new Date(holidayDetailJSON.Date).toLocaleDateString('en-US')}`}
                    </td>
                    <td className="py-2 px-4 border text-black text-center">{holiday.status === '1' ? 'Active' : 'Inactive'}</td>
                    <td className="py-2 px-4 border text-black text-center">
                      <button
                        className="bg-yellow-500 text-white py-2 w-28 rounded"
                        onClick={() => handleUpdate(holiday)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )
              })}
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
<span className="text-white mx-4"> {currentPage} / {Math.ceil(holidays.length / itemsPerPage)}</span>
<button
  onClick={() => handlePageChange(1)}
  disabled={currentPage === Math.ceil(holidays.length / itemsPerPage)}
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

