"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ViewLocationPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
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

  return (
    <div className="p-4">
      {loading ? (
        <div className='flex mt-32 items-center justify-center w-full h-full'>
          <p className='loading loading-ring loading-lg'>Loading...</p>
        </div>
      ) : (
        locations.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.latitute}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.longitute}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.status === 1 ? '0' : '1'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}



