import React from 'react'
import {NavLink} from 'react-router-dom'

import styles from './SideMenu.module.css'

const menuItems = {
   classItems1: [
      {
         title: 'setting',
         icon: <i class="fas fa-user-circle large_text"></i>,
         path: '/setting'
      },
      {
         title: 'clip board',
         icon: <i class="far fa-clipboard large_text"></i>,
         path: '/clipBoard'
      },
      {
         title: 'chart',
         icon: <i class="fas fa-chart-bar large_text"></i>,
         path: '/chart'
      },
      {
         title: 'Manage Class',
         icon: <i class="fas fa-inbox large_text"></i>,
         path: '/class/meHjoTJ-s'
      }
   ],
   classItems2: [
      {
         title: 'DOC 1',
         icon: <i class="far fa-copy large_text"></i>,
         path: '/doc/1'
      },
      {
         title: 'DOC 2',
         icon: <i class="far fa-copy large_text"></i>,
         path: '/doc/2'
      },
      {
         title: 'DOC 3',
         icon: <i class="far fa-copy large_text"></i>,
         path: '/doc/3'
      }
   ],
   classItems3: [
      {
         title: 'CART',
         icon: <i class="fas fa-cart-arrow-down large_text white"></i>,
         path: '/cart'
      }
   ],
   userItems: [
      {
         title: 'documentation',
         icon: <i class="fas fa-rocket large_text"></i>,
         path: '/documentation'
      },
      {
         title: 'help',
         icon: <i class={`fas fa-question green ${styles.bold} large_text`}></i>,
         path: '/help'
      },
      {
         title: 'Ratan Tata',
         icon: <i class="fas fa-user-tie"></i>,
         path: '/user'
      }
   ]

}

function SideMenu({menuOpen}) {
   return (
      <div className={styles.menu_container}>
         <div>
         <NavLink to="/Edulastic" className={styles.row} activeClassName={styles.active_link}>
               <div className={menuOpen? styles.menu_item: `${styles.menu_item} ${styles.menu_item_shrink}`}>
                  <div className={menuOpen? `${styles.icon} green ${styles.bold}`: `${styles.icon} ${styles.menu_shrink_icon} green ${styles.bold}`}>E</div>
                  <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>Edulastic</div>
               </div>
         </NavLink>
            <>
            {
               menuItems.classItems1.map((menuItem, idx) => (
                  <NavLink to={menuItem.path} key={idx} className={styles.row} activeClassName={styles.active_link}>
                     <div className={styles.menu_item}>
                        <div className={menuOpen? styles.icon: `${styles.icon} ${styles.menu_shrink_icon}`}>{menuItem.icon}</div>
                        <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItem.title}</div>
                     </div>
                  </NavLink>
               ))
            }
            </>
            <div className={styles.row_min}>
               <div className={styles.menu_item}>
                  <div className={styles.line_break}></div>
               </div>
            </div>
            <>
            {
               menuItems.classItems2.map((menuItem, idx) => (
                  <NavLink to={menuItem.path} key={idx} className={styles.row} activeClassName={styles.active_link}>
                     <div className={styles.menu_item}>
                        <div className={menuOpen? styles.icon: `${styles.icon} ${styles.menu_shrink_icon}`}>{menuItem.icon}</div>
                        <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItem.title}</div>
                     </div>
                  </NavLink>
               ))
            }
            </>
            <div className={styles.row_min}>
               <div className={styles.menu_item}>
                  <div className={styles.line_break}></div>
               </div>
            </div>
            <>
            <NavLink to={menuItems.classItems3[0].path} className={styles.row} activeClassName={styles.active_link}>
               <div className={styles.menu_item}>
                  <div className={menuOpen? `${styles.icon} ${styles.square_background}`: `${styles.icon} ${styles.menu_shrink_icon} ${styles.square_background}`}>{menuItems.classItems3[0].icon}</div>
                  <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItems.classItems3[0].title}</div>
               </div>
            </NavLink>
            </>
         </div>
         <div>
         <NavLink to={menuItems.userItems[0].path} className={styles.row} activeClassName={styles.active_link}>
            <div className={styles.menu_item}>
               <div className={menuOpen? `${styles.icon} ${styles.rotate}`: `${styles.icon} ${styles.menu_shrink_icon} ${styles.rotate}`}>{menuItems.userItems[0].icon}</div>
               <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItems.userItems[0].title}</div>
            </div>
         </NavLink>
         <NavLink to={menuItems.userItems[1].path} className={styles.row} activeClassName={styles.active_link}>
            <div className={styles.menu_item}>
               <div className={menuOpen? `${styles.icon} ${styles.bold}`: `${styles.icon} ${styles.menu_shrink_icon} ${styles.bold}`}>{menuItems.userItems[1].icon}</div>
               <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItems.userItems[1].title}</div>
            </div>
         </NavLink>
         <NavLink to={menuItems.userItems[2].path} className={styles.row} activeClassName={styles.active_link}>
            <div className={styles.menu_item}>
               <div className={menuOpen? `${styles.icon} ${styles.circle_background}`: `${styles.icon} ${styles.menu_shrink_icon} ${styles.circle_background}`}>RT</div>
               <div className={menuOpen? styles.value: `${styles.value} ${styles.menu_shrink_value}`}>{menuItems.userItems[2].title}</div>
            </div>
         </NavLink>
         </div>
      </div>
   )
}

export default SideMenu
