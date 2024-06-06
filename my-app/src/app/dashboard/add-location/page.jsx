import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from "@/app/ui/dashboard/search/Search"
import Link from "next/link"

const page = () => {
  return (
    <div className={styles.container}>
       <div className={styles.top}>
      <Search placeholder="Search for a location"/>
      <Link href="/dashboard/add-location/add" className="btn btn-success" >Add location</Link>
       </div>
    <iframe className="mt- " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.6529611438123!2d81.0390835!3d26.8827649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be341a1d4abaf%3A0xd232fb21a2c77072!2sBest%20app%20development%20company%20-%20Papaya%20Coders%20Private%20Limited!5e0!3m2!1sen!2sin!4v1717480106868!5m2!1sen!2sin" width="1200" height="450"
      allowFullScreen="" loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className={styles.top}></div>
      <div className={styles.top}></div>
    </div>
  )
}

export default page
