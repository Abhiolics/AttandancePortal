"use client";
import React, { useState, useEffect } from "react";
import { MdApartment, MdBusiness, MdGroups, MdHolidayVillage, MdVisibility } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Chart from "../ui/dashboard/chart/Chart";
import styles from '../ui/dashboard/dashboard.module.css';
import Footer from "../ui/dashboard/footer/footer";
import {BASE_URL} from "../../../config";
import { getCookie } from 'cookies-next';

const Card = ({ title, count }) => (
  <div className="flex c items-center hover:shadow-lg py-8 p-7 bg-[#293755] text-white rounded h-48 shadow-lg w-full">
    <div className="ml-4">
      <span className="block text-gray-300 text-center text-sm font-bold">{title}</span>
      <span className="block text-green-500 font-bold text-xl">{count}</span>
    </div>
  </div>
);

const Page = () => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [holidaysCount, setHolidaysCount] = useState(0);
  const [isAuth, setIsAuth] = useState(() => {
    return getCookie("auth") || "";
  });
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadLottieScript();
    }
  }, []);

  useEffect(() => {
    if (isAuth === false) {
      router.push("/");
      console.log('this block is running');
    } else {
      fetchCounts();
      console.log('this block 2 is running');
    }
  }, []);

  const loadLottieScript = () => {
    if (!document.querySelector('script[src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"]')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const fetchCounts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [employeesResponse, companiesResponse, departmentsResponse, visitorsResponse, holidaysResponse] = await Promise.all([
        axios.get(`${BASE_URL}/employee/get-employees`, config),
        axios.get(`${BASE_URL}/company/get-companies`, config),
        axios.get(`${BASE_URL}/department/get-departments`, config),
        axios.get(`${BASE_URL}/recognition/get-visitors`, config),
        axios.get(`${BASE_URL}/holiday/get-holidays`, config),
      ]);

      setEmployeesCount(employeesResponse.data.data.length);
      setCompaniesCount(companiesResponse.data.data.length);
      setDepartmentsCount(departmentsResponse.data.data.length);
      setVisitorsCount(visitorsResponse.data.data.length);
      setHolidaysCount(holidaysResponse.data.data.length);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <ToastContainer />
      <div className="grid gap-6">
        <div className="ml-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <lottie-player 
            src="https://lottie.host/5383c0bf-6cd2-471a-9af2-5b25a370bc06/o5kqw72KDI.json" 
            background="##ffffff" 
            speed="1" 
            style={{ width: "250px", height: "250px" }} 
            loop 
            autoplay
            direction="1" 
            mode="normal">
          </lottie-player>
          <Card title="Total Employees" count={employeesCount} icon={MdGroups}/>
          <Card title="Total Companies" count={companiesCount} icon={MdBusiness} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Departments" count={departmentsCount} icon={MdApartment} />
          <Card title="Total Visitors" count={visitorsCount} icon={MdVisibility} />
          <Card title="Total Holidays" count={holidaysCount} icon={MdHolidayVillage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
