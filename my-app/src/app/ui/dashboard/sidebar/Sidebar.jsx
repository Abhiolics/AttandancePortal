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
import Link from "next/link";


const menuItems = [
  {
    title: "Menu",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />
      },
      {
        title: "Register",
        path: "/register",
        icon: <AiOutlineUsergroupAdd />
      },

      {
        title: "Admin",
        path: "/dashboard/admin",
        icon: <MdOutlineAdminPanelSettings />
      },

      {
        title: "Add company",
        path: "/dashboard/add-company",
        icon: <CgOrganisation />
      },
      {
        title: "Add Department",
        path: "/dashboard/add-department",
        icon: <AiOutlineAppstoreAdd />
      },
      {
        title: "Add Designation",
        path: "/dashboard/add-designation",
        icon: <TfiIdBadge />
      },
      {
        title: "Add Employee",
        path: "/dashboard/add-employee",
        icon: <IoPersonAddOutline />
      },
      {
        title: "Add Location",
        path: "/dashboard/add-location",
        icon: <MdOutlineAddLocationAlt />
      },
    ]
  },
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

  function logOut() {
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
          <span className={styles.userTitle}> <MdDashboard/>Dashboard</span>
        </div>
      </div>

      {/* NEW TOGGLE MENU */}
      <details className="dropdown">
        <summary className="m-1 btn-outline btn bg-base-500">Tap to see more options</summary>
        <ul  className={`"p-2 shadow menu dropdown-content z-[1] bg-base-500 rounded-box w-52 "` }>
        <li className={styles.cat}><Link href="/dashboard/admin"><MdOutlineAdminPanelSettings size={22}/>Admin</Link></li>
          <li className={styles.cat}><Link href="/dashboard/admin"><AiOutlineUsergroupAdd size={25}/> Register</Link></li>
          <li className={styles.cat}><Link href="/dashboard/add-employee"><IoPersonAddOutline size={22}/>Add Employee</Link></li>
          <li className={styles.cat}><Link href="/dashboard/add-designation"><TfiIdBadge size={22}/>Add Designation</Link></li>
          <li className={styles.cat}><Link href="/dashboard/add-department"><AiOutlineAppstoreAdd size={22}/>Add Department</Link></li>
          <li className={styles.cat}><Link href="/dashboard/add-location"><MdOutlineAddLocationAlt size={22}/>Add Location</Link></li>
          <li className={styles.cat}><Link href="/dashboard/add-company"><CgOrganisation size={22}/>Add company</Link></li>
          
        </ul>
      </details>



      {/* <ul className={styles.list}>
        {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                ))}
                </li>
        ))}
     </ul> */}

      <button className={styles.logout} onClick={() => logOut()}> <LuLogOut /> Logout</button>
    </div>
  )
}

export default Sidebar
