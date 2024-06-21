'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import { PiCalendarDuotone } from "react-icons/pi";

export default function HolidayPage() {
  const [holidays, setHolidays] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({
    accessType: '',
    calendarId: '',
    calendarName: '',
    effectiveDate: null, // Use null to handle date object
    holidayDetails: {
      srNo: '',
      holidayName: '',
      Date: null, // Use null to handle date object
    },
    status: '0',
  });

  const formatDate = (date) => {
    if (!date) return null; // Return null if date is falsy (null or undefined)
    
    // Ensure date is a Date object
    const formattedDate = new Date(date);
    
    // Format the date to yyyy-mm-dd
    const yyyy = formattedDate.getFullYear();
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
  };

  // Example usage:
  const handleDateChange = (newDate) => {
    // Assuming newDate is a new Date object or a date string
    const formattedDate = formatDate(newDate);
    setCurrentHoliday({
      ...currentHoliday,
      effectiveDate: formattedDate,
      holidayDetails: {
        ...currentHoliday.holidayDetails,
        Date: formattedDate,
      },
    });
  };

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
      // const formattedHolidays = response.data.data.map(holiday => ({
      //   ...holiday,
      //   effectiveDate: new Date(holiday.effectiveDate),
      //   holidayDetails: {
      //     ...holiday.holidayDetails,
      //     Date: new Date(holiday.holidayDetails.Date),
      //   },
      // }));
      setHolidays(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (holiday) => {
    setCurrentHoliday(holiday);
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentHoliday({
      accessType: '',
      calendarId: '',
      calendarName: '',
      effectiveDate: null,
      holidayDetails: {
        srNo: '',
        holidayName: '',
        Date: null,
      },
      status: '0',
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

  // const handleDateChange = (date, field) => {
  //   if (field === 'effectiveDate') {
  //     setCurrentHoliday({
  //       ...currentHoliday,
  //       effectiveDate: date,
  //     });
  //   } else {
  //     setCurrentHoliday((prevState) => ({
  //       ...prevState,
  //       holidayDetails: {
  //         ...prevState.holidayDetails,
  //         [field]: date,
  //       },
  //     }));
  //   }
  // };

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
        data: JSON.stringify({
          // ...currentHoliday,
          // effectiveDate: format(parseISO(currentHoliday.effectiveDate.toISOString()), 'yyyy-MM-dd'),
          // holidayDetails: {
          //   ...currentHoliday.holidayDetails,
          //   Date: format(parseISO(currentHoliday.holidayDetails.Date.toISOString()), 'yyyy-MM-dd'),
          // },
          "accessType": currentHoliday.accessType,
          "calendarId": currentHoliday.calendarId,
          "calendarName": currentHoliday.calendarName,
          "effectiveDate": format(parseISO(currentHoliday.effectiveDate), 'yyyy-MM-dd'),
          "holidayDetails": {
              "srNo": `${currentHoliday.holidayDetails.srNo}`,
              "holidayName": currentHoliday.holidayDetails.holidayName,
              "Date": format(parseISO(currentHoliday.holidayDetails.Date), 'yyyy-MM-dd')
          },
          "status": `${currentHoliday.status}`
        }),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchHolidays();
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error.response);
      console.error(error);
    } finally {
      setIsUpdating(false);
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const dates = currentHoliday

    console.log(dates);

  }, [currentHoliday])

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
            <DatePicker
            showIcon
              selected={currentHoliday.effectiveDate}
              onChange={(date) => handleDateChange(date, 'effectiveDate')}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              dateFormat="MM/dd/yyyy"
              icon="date"
              
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
              <DatePicker
             
                selected={currentHoliday.holidayDetails.Date}
                onChange={(date) => handleDateChange(date, 'Date')}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                dateFormat="MM/dd/yyyy"
                showIcon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 48 48"
                  >
                    <mask id="ipSApplication0">
                      <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                        <path
                          fill="#fff"
                          d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                        ></path>
                      </g>
                    </mask>
                    <path
                      fill="currentColor"
                      d="M0 0h48v48H0z"
                      mask="url(#ipSApplication0)"
                    ></path>
                  </svg>
                }
          
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
              {holidays.map((holiday, index) => {
                let holidayDetailJSON = JSON.parse(holiday.holidayDetails);
               console.log(JSON.stringify(holiday.holidayDetails));
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
                  <td className="py-2 px-4 border text-black text-center">{holiday.status}</td>
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
        </>
      )}
    </div>
  );
}





