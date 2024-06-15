"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { MdNotifications, MdPublic, MdSearch } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';

const Navbar = () => {

    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}> {pathname.split("/").pop()} </div>
                <div className={styles.menu}>

                    <div className={styles.icon}>
                    
              {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}><MdNotifications size={20} /></button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn" > <IoSettingsOutline size={20} /></button>

                    
                    </div>
                
            </div>
        </div>
    )
}

export default Navbar
