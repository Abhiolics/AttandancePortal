"use client"
import axios from 'axios';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState("");

  const router = useRouter();

  const checkAdmin = () => {
      const checkAuth = localStorage.getItem("auth");
      console.log("LocalStorage auth value:", checkAuth);
      const isAuthenticated = checkAuth === "true";
      setIsAuth(isAuthenticated);
      console.log("isAuthenticated", isAuthenticated);
  }

  const checkToken = () => {
    const checkTokenValue = localStorage.getItem("token");

    // const isTokenAvailable = checkToken === 

    setToken(checkTokenValue);
  }

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

    let data = {
      email: email,
      password: password
    }

    let config = {
      method: 'post',
      url: 'https://attendence-api-px8b.onrender.com/admin/login',
      data: data,
    }

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", response.data.auth);
        setMessage(response.data.message);
      })
      .catch((error) => console.log(error))
  }

  return (
    
     <div className='flex flex-col overflow-hidden'>
      <div className="hero min-h-screen bg-base-200 flex flex-col gap-3 lg:flex-row-reverse justify-center sm:justify-center  lg:justify-between sm:flex-col items-center overflow-hidden">
        <div className="hero-content mr-4 lg:mr-48 justify-center items-center ">
          <div className="text-center lg:text-left">

          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  flex items-center justify-center">
            <form onSubmit={getData} className='card-body'>
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Login to access all the features without any delay, just by entering your email & password.</p>
              <div className='form-control'>
                <label htmlFor="" className='label'>
                  <span className='label-text'> Email
                  </span>
                </label>
                <input required type="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'> Password</span>
                </label>
                <input required type="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
<div className='form-control mt-6'>

<button  className='btn btn-primary' type="submit" >Submit</button>

</div>
          </form>
          <div className='alert input w-80  ml-3 mb-4' role='alert'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {message && <span>{message}</span>}
          </div>
        </div>
      </div>

    <div className="card ml-64 lg:card bg-base-100 shadow-xl invisible lg:visible sm:invisible">
  <figure><img className='w-80 h-80' src="https://www.camattendance.com/assets/images/login-images/slider_img04.png" alt="Album"/></figure>
  {/* <p className='p-5  flex flex-col'> <span className='text-3xl font-semibold'>Attendance System </span>
  Safe & Secure  with 100% accuracy.</p> */}
  
  <div className="card-body">
    <h2 className="card-title">Attendance System is released!</h2>
    <p>Click the button to view in detail.</p>
    <div className="card-actions justify-center">
      <button className="btn btn-outline rounded-full w-32 mt-5 text-white  ">View</button>
    </div>
  </div>
</div>



    </div>

    </div>

    

  )
}

export default Page
