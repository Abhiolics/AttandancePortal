import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className="flex  sm:flex-col flex-col lg:flex-row justify-between rounded-xl items-center bg-[#182237]">
      <div className={styles.logo}><img className='p-0 w-40' src="/logotp.png" alt="" /></div>
        <div className="text-center mr-10 mb-0 sm:mb-2"> All rights reserved 2024 | Papaya Coders&#8482; </div>
    </div>
  )
}

export default Footer