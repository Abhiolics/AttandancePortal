
"use client"
import axios from 'axios';
import  {useRouter}  from 'next/navigation';
import React, { useState, useEffect } from 'react';


export default function ViewLocationPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupError, setPopupError] = useState('');
  const [showAddLocationForm, setShowAddLocationForm] = useState(false);
  const [formData, setFormData] = useState({
    locationName: '',
    addressLine: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    latitude: '',
    longitude: '',
    status: 0,
  });
  const [editLocation, setEditLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      const config = {
        method: 'get',
        url: 'https://attend.anujdwivedi.in/location/get-locations',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY'
        }
      };
      
      try {
        const response = await axios.request(config);
        setLocations(response.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { locationName, addressLine, postalCode, city, state, country, latitude, longitude, status } = formData;
    
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
      url: 'https://attend.anujdwivedi.in/location/add-location',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setPopupMessage(response.data.message);
      setPopupError('');
      setShowPopup(true);
      setFormData({
        locationName: '',
        addressLine: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
        latitude: '',
        longitude: '',
        status: 0,
      });
      setShowAddLocationForm(false);
      setTimeout(() => setShowPopup(false), 3000);
      router.push('/view-location'); // Redirect to view location page after adding
    } catch (error) {
      setPopupMessage('');
      setPopupError('Error adding location');
      setShowPopup(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { locationName, addressLine, postalCode, city, state, country, latitude, longitude, status } = formData;
    
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
      method: 'put',
      url: `https://attend.anujdwivedi.in/location/update-location/${editLocation.id}`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDgzNzkwfQ.RYwDvUNl1QIutcGqIZJQgonKjka7Gg7BPoR2BGiGxXY'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setPopupMessage(response.data.message);
      setPopupError('');
      setShowPopup(true);
      setFormData({
        locationName: '',
        addressLine: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
        latitude: '',
        longitude: '',
        status: 0,
      });
      setEditLocation(null);
      setTimeout(() => setShowPopup(false), 3000);
      router.push('/view-location'); // Redirect to view location page after updating
    } catch (error) {
      setPopupMessage('');
      setPopupError('Error updating location');
      setShowPopup(true);
    }
  };

  const handleEditClick = (location) => {
    setFormData({
      locationName: location.locationName,
      addressLine: location.addressLine,
      postalCode: location.postalCode,
      city: location.city,
      state: location.state,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      status: location.status,
    });
    setEditLocation(location);
    setShowAddLocationForm(true);
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className='flex mt-32 items-center justify-center w-full h-full'>
          <p className='loading loading-ring loading-lg'>Loading...</p>
        </div>
      ) : (
        locations.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">View Locations</h2>
              <button
                onClick={() => setShowAddLocationForm(true)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Location
              </button>
            </div>
            {showAddLocationForm && (
              <div className="w-full bg-[#182237] rounded-lg shadow-md p-6 mb-8 ">
                <h2 className="text-2xl font-bold mb-4">{editLocation ? 'Update Location' : 'Add Location'}</h2>
                <form onSubmit={editLocation ? handleUpdate : handleSubmit} className='grid grid-cols-3 gap-10 w-full'>
                  <div className="mb-4">
                    <label htmlFor="locationName" className="block text-white">Location Name</label>
                    <input
                      type="text"
                      id="locationName"
                      value={formData.locationName}
                      onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="addressLine" className="block text-white">Address Line</label>
                    <input
                      type="text"
                      id="addressLine"
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      required
                    />
                  </div>
                  {/* Other form fields */}
                  <div className="">
                    <button type="submit" className="btn mt-6 btn-info">
                      {editLocation ? 'Update Location' : 'Add Location'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locations.map((location, index) => (
                    <tr key={location.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.locationName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.addressLine}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.postalCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.latitude}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.longitude}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.status === 1 ? 'Active' : 'Inactive'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button onClick={() => handleEditClick(location)} className="bg-blue-500 w-16 text-white p-2 rounded">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
      {showPopup && (
        <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-lg">
          {popupMessage || popupError}
        </div>
      )}
    </div>
  );
}




