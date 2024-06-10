import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}><img className='p-0 w-40' src="/logotp.png" alt="" /></div>
        <div className={styles.text}> All rights reserved 2024 |</div>
    </div>
  )
}

export default Footer