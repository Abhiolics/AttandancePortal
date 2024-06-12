"use client"
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import MenuLink from './menuLink/MenuLink';
import styles from './sidebar.module.css'
import { MdDashboard, MdViewComfy } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TfiIdBadge } from "react-icons/tfi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { RiLockPasswordLine } from "react-icons/ri";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDevices } from "react-icons/md";
import { RiVoiceRecognitionLine } from "react-icons/ri";

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
      {
        title: "View Schedule",
        path: "/dashboard/view-schedule",
        icon: <MdOutlineAddLocationAlt />
      },
    ]
  },
]


const subMenuItems = [
  
    {
      title: "Add Location",
      path: "/dashboard/add-location",
      icon: <MdOutlineAddLocationAlt />
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
        <Link href="/dashboard/admin">
        <img src="https://tse3.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain" alt="" className={styles.userImage} />
        </Link>
        <div className={styles.userDetail}>
          <span className={styles.username}>Welcome back,</span>
          <span className={styles.userTitle}>Abhay Sharma </span>
        </div>
      </div>

      {/* NEW TOGGLE MENU */}
      {/* <details className="dropdown">
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
      </details> */}



      {/* New Menu */}
      <ul className="menu bg-[#182237] w-56 rounded-box min-h-screen">
      <li><Link href="/dashboard"><MdDashboard size={20}/>Dashboard</Link></li>
 
    <li><Link href="/dashboard/view-company"><CgOrganisation size={20}/>View Company</Link></li>
     
  <li>
          <details >
            <summary><TfiIdBadge size={22}/>Designation</summary>
            <ul>
              <li><Link href="/dashboard/add-designation">Add Designation</Link></li>
              <li><Link href="/dashboard/update-designation">Update Designation</Link></li>
            </ul>
          </details>
        </li>
  <li>
          <details >
            <summary><AiOutlineAppstoreAdd size={22}/>Department</summary>
            <ul>
              <li><Link href="/dashboard/add-department">Add Department</Link></li>
              <li><Link href="/dashboard/update-department">Update Department</Link></li>
            </ul>
          </details>
        </li>
        <li>
          <details >
            <summary><IoPersonAddOutline size={22}/>Employee</summary>
            <ul>
              <li><Link href="/dashboard/add-employee">Add Employee</Link></li>
              <li><a>Update Employee</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details >
            <summary><MdOutlineAddLocationAlt size={22}/>Location</summary>
            <ul>
            <li><Link href="/dashboard/view-location">View Location</Link></li>
              <li><Link href="/dashboard/add-location">Add Location</Link></li>
              <li><Link href="/dashboard/add-location">Update Location</Link></li>
            </ul>
          </details>
        </li>
        <li>
          <details >
            <summary><AiOutlineSchedule size={22} />Schedule</summary>
            <ul>
              <li><Link href="/dashboard/view-schedule">View Schedule</Link></li>
              <li><Link href="/dashboard/update-schedule">Update Schedule</Link></li>
            </ul>
          </details>
        </li>
        <li>
          <details >
            <summary><MdDevices size={22} />Device</summary>
            <ul>
              <li><Link href="/dashboard/view-device">Add Device</Link></li>
              <li><a>Update Device</a></li>
              <li><a>Delete Device</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details >
            <summary><RiVoiceRecognitionLine  size={22}/>Recognition</summary>
            <ul>
              <li><Link href="/dashboard/add-recognition">Add Recognition</Link></li>
              <li><a>Update Recognition</a></li>
            </ul>
          </details>
        </li>
        <button className={styles.logout} onClick={() => logOut()}> <LuLogOut /> Logout</button>
        <img className="rounded-lg p-2 flex items-center justify-end  " src="/download.png" alt="" />
</ul>



      {/* <ul className={styles.list}>
        {menuItems.map((cat) => (
            <li key={cat.title}>
                <span className={styles.cat}>{cat.title}
                
                
                </span>
                
                {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                ))}

                </li>
        ))}
     </ul> */}


    </div>
  )
}

export default Sidebar
