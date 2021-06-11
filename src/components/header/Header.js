import React from 'react'
import PropTypes from 'prop-types'

import styles from './Header.module.css'

function Header({canvasSection, canvasAddress}) {

   const doNothing = () => {
      alert('Does Nothing')
   }

   return (
      <div className={styles.header}>
         <div className={styles.left}>
            <p><i class="fas fa-chalkboard"></i></p>
            <div>
               <p className={styles.main_text}>{canvasSection}</p>
               <p>{canvasAddress}</p>
            </div>
         </div>
         <div className={styles.right}>
            <button className={`${styles.button} ${styles.white}`} onClick={doNothing}><i className="fas fa-spinner bold pink"></i> SYNC WITH CANVAS CLASSROOM</button>
            <button className={`${styles.button} ${styles.blue}`} onClick={doNothing}><i className="fas fa-plus-circle white"></i> ADD CO-TEACHER</button>
            <button className={`${styles.button} ${styles.blue}`} onClick={doNothing}> <i className="fas fa-ellipsis-v white"></i> </button>
         </div>
      </div>
   )
}

Header.propTypes = {
   canvasAddress: PropTypes.string.isRequired,
   canvasSection: PropTypes.string.isRequired
}

export default Header
