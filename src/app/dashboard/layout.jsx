import React from 'react'
import Sidebar from '../ui/dashboard/sidebar/Sidebar'
import Navbar from '../ui/dashboard/navbar/Navbar'
import styles from '../ui/dashboard/dashboard.module.css'
import Footer from '../ui/dashboard/footer/footer'

const Layout = ({ children }) => {
  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${styles.container}`}>
      <div className={`md:w-1/4 lg:w-1/5 ${styles.menu} `}>
        <Sidebar />
      </div>
      <div className={`flex-1 md:w-3/4 lg:w-4/5 ${styles.content} `}>
        <Navbar />
        <main className="flex-grow p-4">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Layout

