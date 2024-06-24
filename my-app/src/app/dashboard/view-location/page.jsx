"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import citiesData from './cities.json';
import Footer from '../../ui/dashboard/footer/footer';

export default function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    locationName: '',
    addressLine: '',
    postalCode: '',
    city: '',
    state: '',
    country: 'India',
    latitute: '',
    longitute: '',
    category: '',
    accessLevel: '',
    status: "0",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('https://attendence-api-px8b.onrender.com/location/get-locations', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
      });
      setLocations(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch locations');
    }finally {
      setIsLoading(false); 
    }
  };

  const handleUpdate = (location) => {
    setCurrentLocation(location);
    setIsUpdating(true);
    setIsAdding(false);
  };

  useEffect(() => {
    console.log(currentLocation)
  }, [currentLocation])

  const handleAdd = () => {
    setCurrentLocation({
      locationName: '',
      addressLine: '',
      postalCode: '',
      city: '',
      state: '',
      country: 'India',
      latitute: '',
      longitute: '',
      category: '',
      accessLevel: '',
      status: "0",
    });
    setIsAdding(true);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "postalCode") {
      if (!/^\d*$/.test(value)) {
        toast.error("Postal code must be numeric");
        return;
      }
    }
    setCurrentLocation({
      ...currentLocation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: isUpdating ? 'put' : 'post',
        url: isUpdating
          ? `https://attendence-api-px8b.onrender.com/location/update-location/${currentLocation.id}`
          : 'https://attendence-api-px8b.onrender.com/location/add-location',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTc1MjQ5fQ.4tkKagEZzmMrKsAqfUQV2dl6UivUXjrh6sb5w0Mg_FE',
        },
        data: JSON.stringify({
          "category": currentLocation.category,
          "accessLevel": currentLocation.accessLevel,
          "locationName": currentLocation.locationName,
          "addressLine": currentLocation.addressLine,
          "postalCode": currentLocation.postalCode,
          "city": currentLocation.city,
          "state": currentLocation.state,
          "country": currentLocation.country,
          "latitute":currentLocation.latitute,
          "longitute": currentLocation.longitute,
          "status": `${currentLocation.status}`
        }),
      };
      const response = await axios(config);
      toast.success(response.data.message);
      fetchLocations();
      setIsUpdating(false);
      setIsAdding(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setIsAdding(false);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {isAdding || isUpdating ? (
        <LocationForm
          currentLocation={currentLocation}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isUpdating={isUpdating}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={handleAdd}
            >
              Add Location
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
          <div className='!w-[100%] overflow-x-scroll py-2 sm:px-6 lg:px-8 scroll'>
          <table className="min-w-full  bg-white border text-black">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 border text-center px-4">Location Name</th>
                <th className="py-2 px-4 border ">Address Line</th>
                <th className="py-2 px-4 border ">Postal Code</th>
                <th className="py-2 px-4 border ">City</th>
                <th className="py-2 px-4 border ">State</th>
                <th className="py-2 px-4 border ">Country</th>
                <th className="py-2 px-4 border ">Latitude</th>
                <th className="py-2 px-4 border ">Longitude</th>
                <th className="py-2 px-4 border ">Status</th>
                <th className="py-2 px-4 border ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="border-t">
                  <td className="py-2 px-4 border text-center">{location.locationName}</td>
                  <td className="py-2 px-4 border text-center">{location.addressLine}</td>
                  <td className="py-2 px-4 border text-center">{location.postalCode}</td>
                  <td className="py-2 px-4 border text-center">{location.city}</td>
                  <td className="py-2 px-4 border text-center">{location.state}</td>
                  <td className="py-2 px-4 border text-center">{location.country}</td>
                  <td className="py-2 px-4 border text-center">{location.latitute}</td>
                  <td className="py-2 px-4 border text-center">{location.longitute}</td>
                  <td className="py-2 px-4 border text-center">{location.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="bg-yellow-500 text-white py-1 w-28 rounded mr-2"
                      onClick={() => handleUpdate(location)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
          </div>
         )}
       
          </div>
        </>
      )}
         {!isLoading && <Footer />}
    </div>
    
  );
};

const LocationForm = ({ currentLocation, handleChange, handleSubmit, handleCancel, isUpdating }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Extract unique states from cities data
    const uniqueStates = [...new Set(citiesData.map(city => city.state))];
    setStates(uniqueStates);
  }, []);

  useEffect(() => {
    // Update cities dropdown based on selected state
    if (currentLocation.state) {
      const filteredCities = citiesData.filter(city => city.state === currentLocation.state);
      setCities(filteredCities);
    }
  }, [currentLocation.state]);

  const fields = Object.keys(currentLocation).filter(key => key !== 'id' && key !== 'status');

  console.log(fields);

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded">
      <div className="grid grid-cols-3 gap-4 w-full">
        {fields.map((key) => (
          <div className={`mb-4 ${key === 'locationName' || key === 'addressLine' ? 'col-span-3' : 'col-span-1'}`} key={key}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === 'state' ? (
              <select
                name={key}
                value={currentLocation[key]}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : (
              <input
                type={key === 'postalCode' ? 'number' : 'text'}
                name={key}
                value={currentLocation[key]}
                onChange={handleChange}
                className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            )}
          </div>
        ))}
        <div className="mb-4 col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            name="status"
            value={currentLocation.status}
            onChange={handleChange}
            className="shadow appearance-none border bg-slate-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            
            <option value={"1"}>Active</option>
            <option value={"0"}>Inactive</option>
          </select>
        </div>
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
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
