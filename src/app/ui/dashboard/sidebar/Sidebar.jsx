"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuLink from "./menuLink/MenuLink";
import styles from "./sidebar.module.css";
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
import { SiTripadvisor } from "react-icons/si";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdDevices } from "react-icons/md";
import { RiVoiceRecognitionLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { TbHealthRecognition } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { BASE_URL } from "../../../../../config";
import { Button, Drawer } from 'antd';

const Sidebar = () => {
  const [name, setName] = useState("");
  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
      router.push("/");
    }
  }, [isAuth]);

  function logOut() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/admin/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.clear();
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("name");
      setName(username);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Link href="/dashboard/admin">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain"
            alt="admin image"
            className={styles.userImage}
          />
        </Link>
        <div className={styles.userDetail}>
          <span className={styles.username}>Welcome back,</span>
          <span className={styles.userTitle}>{name}</span>
        </div>
        <Button className="block md:hidden" type="primary" onClick={showDrawer}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
</svg>
      </Button>
      <Drawer title={null} onClose={onClose} open={open}>
      <ul className="menu bg-[#1a294f] rounded-box min-h-screen">
        <li>
          <Link href="/dashboard">
            <MdDashboard size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/employees">
            <MdGroups size={22} />
            Employees
          </Link>
        </li>
        <li>
          <Link href="/dashboard/view-company">
            <CgOrganisation size={20} />
            View Company
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reports">
            <TbReportAnalytics size={25} />
            Reports
          </Link>
        </li>
        <li>
          <details>
            <summary>
              <BsClipboardData size={20} />
              Master Data
            </summary>
            <ul>
              <li>
                <Link href="/dashboard/designation">
                  <TfiIdBadge size={22} /> Designation
                </Link>
              </li>
              <li>
                <Link href="/dashboard/department">
                  <AiOutlineAppstoreAdd size={22} />
                  Department
                </Link>
              </li>
              <li>
                <Link href="/dashboard/view-location">
                  <MdOutlineAddLocationAlt size={22} /> Location
                </Link>
              </li>
              <li>
                <Link href="/dashboard/holiday">
                  <SlCalender size={22} />
                  Holiday
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href="/dashboard/schedule">
            <AiOutlineSchedule size={22} /> Schedule{" "}
          </Link>
        </li>
        <li>
          <Link href="/dashboard/items">
            <IoFastFoodOutline size={22} /> Items
          </Link>
        </li>
        <li>
          <Link href="/dashboard/devices">
            <MdDevices size={22} />
            Devices
          </Link>
        </li>

        {/* <li>
          <details >
            <summary><RiVoiceRecognitionLine  size={22}/>Recognitions</summary>
            <ul>

              <li><Link href="/dashboard/visitors"><SiTripadvisor size={22}/> Visitors</Link></li>
              <li><Link href="/dashboard/recognition"><TbHealthRecognition  size={22}/>Recognition</Link></li>
            </ul>
          </details>
        </li> */}

        <button className={styles.logout} onClick={() => logOut()}>
          {" "}
          <LuLogOut /> Logout
        </button>
        <img
          className="rounded-lg p-2 bottom-5 flex items-center justify-end  "
          src="/download.png"
          alt=""
        />
      </ul>
      </Drawer>
      </div>

      <ul className="menu hidden md:block bg-[#1a294f] w-56 rounded-box min-h-screen">
        <li>
          <Link href="/dashboard">
            <MdDashboard size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/employees">
            <MdGroups size={22} />
            Employees
          </Link>
        </li>
        <li>
          <Link href="/dashboard/view-company">
            <CgOrganisation size={20} />
            View Company
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reports">
            <TbReportAnalytics size={25} />
            Reports
          </Link>
        </li>
        <li>
          <details>
            <summary>
              <BsClipboardData size={20} />
              Master Data
            </summary>
            <ul>
              <li>
                <Link href="/dashboard/designation">
                  <TfiIdBadge size={22} /> Designation
                </Link>
              </li>
              <li>
                <Link href="/dashboard/department">
                  <AiOutlineAppstoreAdd size={22} />
                  Department
                </Link>
              </li>
              <li>
                <Link href="/dashboard/view-location">
                  <MdOutlineAddLocationAlt size={22} /> Location
                </Link>
              </li>
              <li>
                <Link href="/dashboard/holiday">
                  <SlCalender size={22} />
                  Holiday
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href="/dashboard/schedule">
            <AiOutlineSchedule size={22} /> Schedule{" "}
          </Link>
        </li>
        <li>
          <Link href="/dashboard/items">
            <IoFastFoodOutline size={22} /> Items
          </Link>
        </li>
        <li>
          <Link href="/dashboard/devices">
            <MdDevices size={22} />
            Devices
          </Link>
        </li>

        {/* <li>
          <details >
            <summary><RiVoiceRecognitionLine  size={22}/>Recognitions</summary>
            <ul>

              <li><Link href="/dashboard/visitors"><SiTripadvisor size={22}/> Visitors</Link></li>
              <li><Link href="/dashboard/recognition"><TbHealthRecognition  size={22}/>Recognition</Link></li>
            </ul>
          </details>
        </li> */}

        <button className={styles.logout} onClick={() => logOut()}>
          {" "}
          <LuLogOut /> Logout
        </button>
        <img
          className="rounded-lg p-2 bottom-5 flex items-center justify-end  "
          src="/download.png"
          alt=""
        />
      </ul>
    </div>
  );
};

export default Sidebar;
