import React from 'react'

import styles from './DefaultPage.module.css'

function DefaultPage() {
   return (
      <div className={styles.default_page_container}>
         <p>Status Code: 404</p>
         <p>Not Found / Under Development</p>
      </div>
   )
}

export default DefaultPage
