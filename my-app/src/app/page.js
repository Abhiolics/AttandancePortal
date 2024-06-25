"use client"
import axios from 'axios';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [effect, setEffect] = useState(false);

  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState("");

  const router = useRouter();

  const checkAdmin = () => {
    const checkAuth = localStorage.getItem("auth");
    console.log("LocalStorage auth value:", checkAuth);
    const isAuthenticated = checkAuth === "true";
    setIsAuth(isAuthenticated);
    console.log("isAuthenticated", isAuthenticated);
  };

  const checkToken = () => {
    const checkTokenValue = localStorage.getItem("token");
    setToken(checkTokenValue);
  };

  useEffect(() => {
    checkAdmin();
    checkToken();
  }, []);

  useEffect(() => {
    console.log("isAuth", isAuth);
    if (isAuth === false) {
      router.push('/login');
    }
  }, [isAuth]);

  function getData(e) {
    e.preventDefault();
    setEffect(true);
    setMessage("");

    let data = {
      email: email,
      password: password
    };

    let config = {
      method: 'post',
      url: 'https://attend.anujdwivedi.in/admin/login',
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", response.data.auth);
        setMessage(response.data.message);
        setEffect(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setMessage("Incorrect username or password");
        setEffect(false);
      });
  }

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row-reverse items-center lg:justify-between p-4">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <div className="w-full max-w-sm shadow-2xl bg-base-100 p-6 rounded-lg">
            <form onSubmit={getData} className="space-y-6">
              <h1 className="text-5xl font-bold text-center">Login now!</h1>
              <p className="text-center">Login to access all the features without any delay, just by entering your email & password.</p>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input required type="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input required type="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className={`btn btn-primary text-[20px] text-white rounded hover:bg-blue-700 hover:shadow-xl`}>
                  <div className={`${effect && "loading loading-ring loading-xs"} inline-block`}></div>
                  Submit
                </button>
              </div>
            </form>
            {message && (
              <div className="alert mt-4 " role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info text-red-600 shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3 visible sm:invisible lg:visible overflow-hidden">
          <Slider {...sliderSettings} className="w-full ">
            <div>
              <img src="https://www.camattendance.com/assets/images/login-images/slider_img04.png" alt="Slide 1" className="w-full h-auto object-cover"/>
            </div>
            <div>
              <img src="https://www.camattendance.com/assets/images/login-images/slider_img02.png" alt="Slide 2" className="w-full h-auto object-cover"/>
            </div>
            <div>
              <img src="https://www.camattendance.com/assets/images/login-images/slider_img03.png" alt="Slide 3" className="w-full h-auto object-cover"/>
            </div>
          </Slider>
          <div className="card-body text-center ">
            <h2 className="card-title">Attendance System is released!</h2>
            <p className='text-sm relative'> Powered by</p>
            <div className='flex justify-center items-center absolute'>
              <img src='./logotp.png' className='w-40 mt-10 flex justify-center items-center ml-16' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


