"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/schedule/get-schedules',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3ODI5NDIwfQ.G3TcytnSlxO3ACTFuqyjfghfy3Lq8y-LkBHctpRGiMY'
        }
      };
      
      try {
        const response = await axios.request(config);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 ">
      {loading ? (
        <div className='flex mt-32 items-center justify-center w-full h-full'>
          <p className='loading loading-ring loading-lg'>Loading...</p>
        </div>
      ) : (
        data.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((currElem, index) => (
                  <tr key={currElem.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currElem.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currElem.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currElem.startTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currElem.endTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currElem.status === 1 ? 'Active' : 'Inactive'}</td>
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









