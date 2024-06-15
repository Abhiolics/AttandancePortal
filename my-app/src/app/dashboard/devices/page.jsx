"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentDevice, setCurrentDevice] = useState({
    serialNumber: '',
    location: '',
    name: '',
    type: '',
    status: 1,
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(
        'https://attend.anujdwivedi.in/device/get-devices',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
          },
        }
      );
      setDevices(response.data.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleUpdate = (device) => {
    setCurrentDevice(device);
    setIsUpdating(true);
    setIsAdding(false); // Ensure add form is hidden
  };

  const handleAdd = () => {
    setCurrentDevice({
      serialNumber: '',
      location: '',
      name: '',
      type: '',
      status: 1,
    });
    setIsAdding(true);
    setIsUpdating(false); // Ensure update form is hidden
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isUpdating) {
        const updateConfig = {
          method: 'put',
          url: `https://attend.anujdwivedi.in/device/update-device/${currentDevice.id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
          },
          data: JSON.stringify(currentDevice),
        };
        response = await axios(updateConfig);
      } else {
        const addConfig = {
          method: 'post',
          url: 'https://attend.anujdwivedi.in/device/add-device',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
          },
          data: JSON.stringify(currentDevice),
        };
        response = await axios(addConfig);
      }

      toast.success(response.data.message);
      fetchDevices();
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error:', error);
    } finally {
      setIsAdding(false);
      setIsUpdating(false);
      setCurrentDevice({
        serialNumber: '',
        location: '',
        name: '',
        type: '',
        status: 1,
      });
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Serial Number
            </label>
            <input
              type="text"
              name="serialNumber"
              value={currentDevice.serialNumber}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={currentDevice.location}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={currentDevice.name}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={currentDevice.type}
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
              value={currentDevice.status}
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
              {isUpdating ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 w-28 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={handleAdd}
            >
              Add Device
            </button>
          </div>
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border text-center">Serial Number</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="py-2 px-4 border text-black text-center">
                    {device.serialNumber}
                  </td>
                  <td className="py-2 px-4 text-black text-center border">{device.location}</td>
                  <td className="py-2 px-4 text-black text-center border">{device.name}</td>
                  <td className="py-2 px-4 text-black text-center border">{device.type}</td>
                  <td className="py-2 px-4 text-black text-center border">
                    {device.status === 1 ? 'Active' : 'Inactive'}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 w-28 rounded"
                      onClick={() => handleUpdate(device)}
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
};

export default DevicesPage;

