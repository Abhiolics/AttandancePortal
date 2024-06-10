import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}><img className='p-4' src="https://www.camattendance.com/assets/images/logos/camattendance_icon.svg" alt="" /></div>
        <div className={styles.text}> All rights reserved 2024 | KENT Attendance</div>
    </div>
  )
}

export default Footer