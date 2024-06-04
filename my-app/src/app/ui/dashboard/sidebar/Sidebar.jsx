"use client"
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import MenuLink from './menuLink/MenuLink';
import styles from './sidebar.module.css'
import { MdDashboard } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TfiIdBadge } from "react-icons/tfi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";


const menuItems = [
    {
        title: "Attendance",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard/>
            },
            {
                title: "Register",
                path: "/register",
                icon: <AiOutlineUsergroupAdd />
            },
            {
                title: "Admin",
                path: "/admin/get-admin",
                icon: <MdOutlineAdminPanelSettings />
            },
        ]
    },
    {
        title: "Other Features",
        list: [
            {
                title: "Add company",
                path: "/add-company",
                icon: <CgOrganisation />
            },
            {
                title: "Add Department",
                path: "/add-department",
                icon: <AiOutlineAppstoreAdd />
            },
            {
                title: "Add Designation",
                path: "/add-designation",
                icon: <TfiIdBadge />
            },
            {
                title: "Add Employee",
                path: "/add-employee",
                icon: <IoPersonAddOutline />
            },
            {
                title: "Add Location",
                path: "/add-location",
                icon: <MdOutlineAddLocationAlt />
            },
        ]
    }
]

const Sidebar = () => {

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
        url: 'https://attendence-api-px8b.onrender.com/admin/logout',
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
    <div className={styles.container}>
        <div className={styles.user}>
            <img src="https://tse3.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain" alt="" className={styles.userImage} />
            <div className={styles.userDetail}>
                <span className={styles.username}> Abhay Sharma</span>
                <span className={styles.userTitle}>Administrator</span>
            </div>
        </div>
     <ul className={styles.list}>
        {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                ))}
                </li>
        ))}
     </ul>

     <button className={styles.logout} onClick={() => logOut()}> <LuLogOut /> Logout</button>
    </div>
  )
}

export default Sidebar
