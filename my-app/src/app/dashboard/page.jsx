"use client"
import Card from "../ui/dashboard/card/Card"
import Chart from "../ui/dashboard/chart/Chart"
import styles from '../ui/dashboard/dashboard.module.css'


import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

const Page = () => {

  const [company, setCompany] = useState([]);
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

  function logOut(){
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
      router.push('/login')
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
    <div className={styles.cards}>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
        <Chart/>
    </div>
    </div>
  )
}

export default Page;
