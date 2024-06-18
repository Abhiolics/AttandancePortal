import { MdSupervisedUserCircle } from "react-icons/md"
import styles from './card.module.css'


const card = () => {
  return (
    <div className="bg-[#151c2c]">
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}> Total Employees</span>
        <span className={styles.positive}>112</span>
      </div>
    </div>
  )
}

export default card
