"use client";
import React, { useState, useEffect } from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Chart from "../ui/dashboard/chart/Chart";
import styles from '../ui/dashboard/dashboard.module.css';

const Card = ({ title, count }) => (
  <div className="flex items-center p-4 bg-[#182237] text-white  rounded shadow-lg">
    <div className="ml-4">
      <span className="block text-gray-300 text-sm font-bold">{title}</span>
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
  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAdmin();
    checkToken();
  }, []);

  useEffect(() => {
    if (isAuth === false) {
      router.push("/login");
    } else if (isAuth === true) {
      fetchCounts();
    }
  }, [isAuth]);

  const checkAdmin = () => {
    const checkAuth = localStorage.getItem("auth");
    const isAuthenticated = checkAuth === "true";
    setIsAuth(isAuthenticated);
  };

  const checkToken = () => {
    const checkTokenValue = localStorage.getItem("token");
    setToken(checkTokenValue);
  };

  const fetchCounts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [employeesResponse, companiesResponse, departmentsResponse, visitorsResponse, holidaysResponse] = await Promise.all([
        axios.get('https://attend.anujdwivedi.in/employee/get-employees', config),
        axios.get('https://attend.anujdwivedi.in/company/get-companies', config),
        axios.get('https://attend.anujdwivedi.in/department/get-departments', config),
        axios.get('https://attend.anujdwivedi.in/recognition/get-visitors', config),
        axios.get('https://attend.anujdwivedi.in/holiday/get-holidays', config),
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

  const logOut = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://attend.anujdwivedi.in//admin/logout',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.clear();
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen p-8">
      <ToastContainer />
      <div className="grid bg-[#151c2c]  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card   title="Total Employees" count={employeesCount}  />
        <Card title="Total Companies" count={companiesCount} />
        <Card title="Total Departments" count={departmentsCount} />
        <Card title="Total Visitors" count={visitorsCount} />
        <Card title="Total Holidays" count={holidaysCount} />
      </div>
      <div className={styles.main}>
        <Chart />
      </div>
    </div>
  );
};

export default Page;

