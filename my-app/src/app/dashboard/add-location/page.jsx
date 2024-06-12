"use client"
import React, { useState } from 'react';
import axios from 'axios';

const AddLocationPage = () => {
  const [locationName, setLocationName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      locationName,
      addressLine,
      postalCode,
      city,
      state,
      country,
      latitude,
      longitude,
      status,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://attend.anujdwivedi.in/location/add-location',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setMessage(response.data.message);
      setError('');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setMessage('');
      setError('Error adding location');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="w-full bg-[#182237] rounded-lg shadow-md p-6 mb-8 ">
        <h2 className="text-2xl font-bold mb-4">Add Location</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-10 w-full'>
          <div className="mb-4">
            <label htmlFor="locationName" className="block text-white">Location Name</label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="addressLine" className="block text-white">Address Line</label>
            <input
              type="text"
              id="addressLine"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-white">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-white">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-white">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-white">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-white">Latitude</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-white">Longitude</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-white">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value={0}>Inactive</option>
              <option value={1}>Active</option>
            </select>
          </div>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Add Location
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default AddLocationPage;


