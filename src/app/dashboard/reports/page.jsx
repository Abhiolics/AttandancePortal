"use client";
import React, { useEffect, useState } from "react";
import "./reports.css";
import axios from "axios";
import Footer from "../../ui/dashboard/footer/footer";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { BASE_URL } from "../../../../config";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { parseISO, differenceInMinutes, format } from "date-fns";
dayjs.extend(customParseFormat);
import { getCookie } from 'cookies-next';

const AttendanceReport = () => {
  const [data, setData] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    fromDate: dayjs().subtract(1, "day"),
    toDate: dayjs(),
  });
  const [isLoading, setIsLoading] = useState(false);
  
    const [token, setToken] = useState(() => {
    return getCookie("token") || "";
  });

  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let data = JSON.stringify({
        fromDate: selectedDates.fromDate,
        // toDate: selectedDates.toDate,
        toDate: selectedDates.toDate.add(1, "day"),
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/export`,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + token,
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDates]);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      // make endDate 1 day ahead
      // endDate.add(1, "day");
      if (dayjs.isDayjs(startDate) && dayjs.isDayjs(endDate)) {
        setSelectedDates({
          fromDate: startDate,
          toDate: endDate,
        });
      } else {
        console.error("Invalid date objects received.");
      }
    } else {
      setSelectedDates({
        fromDate: null,
        toDate: null,
      });
    }
  };

  const parseISO = (dateString) => {
    function format12Hour(hour) {
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}`;
    }

    const utcDate = new Date(dateString);

    const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istDate = new Date(utcDate.getTime() + istOffset);

    // const day = String(istDate.getUTCDate()).padStart(2, '0');
    // const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    // const year = istDate.getUTCFullYear();
    const hours = istDate.getUTCHours();
    const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = format12Hour(hours);
    // const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
    const formattedDate = `${formattedHours}:${minutes} ${period}`;
    return formattedDate;
  };

  const subtractTimes = (time1, time2) => {
    const parseTime = (time) => {
      const [hours, minutes] = time.split(":");
      const isPM = time.includes("pm");
      const hour = parseInt(hours, 10);
      const adjustedHour = hour === 12 ? 12 : isPM ? hour + 12 : hour;
      return new Date().setHours(adjustedHour, parseInt(minutes, 10), 0, 0);
    };

    const date1 = parseTime(time1);
    const date2 = parseTime(time2);

    const differenceMs = date2 - date1;

    if (differenceMs < 0) {
      return "End time must be after start time";
    }

    const totalMinutes = Math.floor(differenceMs / (1000 * 60));
    const hoursDiff = Math.floor(totalMinutes / 60);
    const minutesDiff = totalMinutes % 60;

    if (hoursDiff > 0) {
      return `${hoursDiff} hour${
        hoursDiff > 1 ? "s" : ""
      } ${minutesDiff} minute${minutesDiff !== 1 ? "s" : ""}`;
    } else {
      return `${minutesDiff} minute${minutesDiff !== 1 ? "s" : ""}`;
    }
  };

  const formatedTime = (time) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
  };
  const date = new Date(time);
  return date.toLocaleString('en-US', options);
  }

  const exportToExcel = () => {
    const filteredData = data.map((emp) => {
      return {
        "EMP ID": emp.emp_id,
        Name: `${emp.firstName} ${emp.lastname}`,
        Email: emp.email,
        Company: emp.companyId,
        Designation: emp.d_name,
        Date: new Date(emp.date_at).toLocaleDateString(),
        InTime: formatedTime(emp.inTime),
        OutTime: formatedTime(emp.outTime),
        "Total Time": subtractTimes(
          parseISO(emp.inTime),
          parseISO(emp.outTime)
        ),
      };
    });
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "attendance_report.xlsx");
  };

  return (
    <>
      <div className="relative flex items-center justify-center ">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent bg-opacity-50">
            <div
              role="status"
              className="rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"
            ></div>
            <h2 className="text-center text-white text-xl font-semibold">
              Loading... Please wait!
            </h2>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="sm:-mx-6 lg:-mx-8 ">
              <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <RangePicker
                  allowClear={false}
                    defaultValue={[
                      selectedDates.fromDate,
                      selectedDates.toDate,
                    ]}
                    format={dateFormat}
                    onChange={handleDateChange}
                  />
                  <button
                    onClick={exportToExcel}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Export Report
                  </button>
                </div>
                <div className="flex flex-col overflow-x-auto">
                  <div className="w-full">
                    <div className="inline-block w-full py-2 px-4">
                      <table className="w-full bg-white mt-4">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              EMP ID
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Name
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Email
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Company
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Designation
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Date
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              In-Time
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Out-Time
                            </th>
                            <th className="py-2 px-4 border-b border text-white bg-gray-600">
                              Total Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((emp, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.emp_id}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.firstName} {emp.lastname}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.email}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.companyId}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {emp.d_name}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {new Date(emp.date_at).toLocaleDateString()}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {formatedTime(emp.inTime)}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {formatedTime(emp.outTime)}
                              </td>
                              <td className="py-2 px-4 border-b text-center text-black border">
                                {subtractTimes(
                                  parseISO(emp.inTime),
                                  parseISO(emp.outTime)
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isLoading && <Footer />}
    </>
  );
};

export default AttendanceReport;
