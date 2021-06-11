import React from 'react'

import styles from './Student.module.css'

function Student({data, checkedCheckbox, handleCheckboxChange, handleEdit}) {
   return (
      <div className={`${styles.row} ${styles.text_dark}`}>
      <p className={styles.check_box}><input type="checkbox" defaultChecked={checkedCheckbox[data.username]} name={data.username} id={data.username} onChange={(e) => handleCheckboxChange(e, data.username)}/></p>
      <p className={styles.info}>{data.name}</p>
      <p className={styles.info}>{data.username}</p>
      <p className={`${styles.info} ${styles.center} ${styles.text_red}`}><i class="fas fa-times"></i></p>
      <p className={`${styles.info} ${styles.center}`}><i class="fas fa-check"></i></p>
      <p className={`${styles.info} ${styles.center}`}>{data.status===1?'Active': 'Inactive'}</p>
      <p className={`${styles.edit} ${styles.center}`}>{checkedCheckbox[data.username]?<button onClick={() => handleEdit(data)} className={`${styles.button} ${styles.green}`}>Edit</button>: null}</p>
   </div>
   )
}

export default Student
