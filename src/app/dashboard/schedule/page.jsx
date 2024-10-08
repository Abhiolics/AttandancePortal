
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../ui/dashboard/footer/footer";
import {BASE_URL} from "../../../../config";
import { getCookie } from 'cookies-next';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [currentSchedule, setCurrentSchedule] = useState({
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    status: 1,
  });
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/schedule/get-schedules`,
        {
          headers: {
            Authorization:
              "Bearer " + token,
          },
        }
      );
      setSchedules(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }

  };

  const handleUpdate = (schedule) => {
    setCurrentSchedule(schedule);
    setIsUpdating(true);
  };

  const handleAdd = () => {
    setCurrentSchedule({
      id: "",
      name: "",
      startTime: "",
      endTime: "",
      status: 1,
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule({
      ...currentSchedule,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? "put" : "post",
        url: isUpdating
          ? `${BASE_URL}/schedule/update-schedule/${currentSchedule.id}`
          : `${BASE_URL}/schedule/add-schedule`,
        headers: {
          "Content-Type": "application/json",
          Authorization:
                        "Bearer " + token,
        },
        data: JSON.stringify(currentSchedule),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchSchedules();
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsUpdating(false);
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/schedule/delete-schedule/${id}`,
        {
          headers: {
            Authorization:
                          "Bearer " + token,
          },
        }
      );
      toast.success(response.data.message);
      fetchSchedules();
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(schedules.length / itemsPerPage)) return Math.ceil(schedules.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedSchedule = schedules.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={currentSchedule.name}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={currentSchedule.startTime}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={currentSchedule.endTime}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={currentSchedule.status}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 w-28 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isUpdating ? "Update" : "Add"}
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
              Add Schedule
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
                <th className="py-2 px-4 border  ">S.No</th>
                
                <th className="py-2 px-4 border ">Name</th>
                <th className="py-2 px-4 border ">Start Time</th>
                <th className="py-2 px-4 border ">End Time</th>
                <th className="py-2 px-4 border ">Status</th>
                <th className="py-2 px-4 border ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedSchedule.map((schedule, index) => (
                <tr key={schedule.id}>
                  <td className="py-2 px-4 border text-black text-center">
                    {index + 1}
                  </td>
                
                  <td className="py-2 px-4 border text-black text-center">
                    {schedule.name}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">
                    {schedule.startTime}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">
                    {schedule.endTime}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">
                    {schedule.status === 1 ? "Active" : "Inactive"}
                  </td>
                  <td className="py-2 px-4 border text-black text-center">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleUpdate(schedule)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      Delete
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
<span className="text-white mx-4"> {currentPage} / {Math.ceil(schedules.length / itemsPerPage)}</span>
<button
  onClick={() => handlePageChange(1)}
  disabled={currentPage === Math.ceil(schedules.length / itemsPerPage)}
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










