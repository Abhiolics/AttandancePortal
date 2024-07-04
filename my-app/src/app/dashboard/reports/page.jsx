'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDownload } from 'react-icons/ai';

const MusterRoll = () => {
  const [data, setData] = useState({
    location: "Lucknow",
    company: "papaya_coders_3894638fdgy8tgd",
    department: "Operations",
    designation: "something",
    device: "TEM_2204",
    sortBy: "0",
    fromDate: "0",
    toDate: "0",
    fileType: "Excel"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = JSON.stringify(data);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://attend.anujdwivedi.in/reports/muster-roll',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5MzgyODI3fQ.9Q-PXf4Fl9OWxCWtktFuryIcXea8unhpF9X8Z0MFPJs'
        },
        data: requestData
      };

      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadFile = () => {
    window.open("http://localhost:5000/download?file=muster_roll_1719472684760.xlsx", "_blank");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(data).map((key, index) => (
          <div key={index} className="bg-white text-black shadow-md rounded p-4 flex flex-col justify-between">
            <h2 className="text-xl font-bold capitalize">{key}</h2>
            <p>{data[key]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button 
          onClick={downloadFile}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <AiOutlineDownload className="mr-2" /> Download Report
        </button>
      </div>
    </div>
  );
};

export default MusterRoll;


