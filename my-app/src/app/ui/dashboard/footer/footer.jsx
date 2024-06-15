import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className="flex  sm:flex-col flex-col lg:flex-row justify-between items-center bg-[#182237]">
      <div className={styles.logo}><img className='p-0 w-40' src="/logotp.png" alt="" /></div>
        <div className="text-center mr-2"> All rights reserved 2024</div>
    </div>
  )
}

export default Footer