"use client";

import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ViewCompanyPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/company/get-companies',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3OTk5MzE1fQ.pnsgXqSyIYysmmWeB9B4TZBrgZy7OwKvvFZIkV6cEYg'
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
    <div className="p-4">
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((company, index) => (
                  <tr key={company.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.companyId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.status === 1 ? 'Active' : 'Inactive'}</td>
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

