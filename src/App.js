
import React, {useState} from 'react'
import Modal from 'react-modal'
import {Switch, Route} from 'react-router-dom'

import Header from './components/header/Header'
import SideMenu from './components/sideMenu/SideMenu'
import ClassSection from './components/classSection/ClassSection'
import DefaultPage from './components/defaultPage/DefaultPage'

Modal.setAppElement(document.getElementById('root'));

export default function App() {
   const [menuOpen, setMenuOpen] = useState(false)
   return (
      <div className='app'>
         <div className={menuOpen?"menu":"menu menu_shrink"}>
            <SideMenu menuOpen={menuOpen}/>
            <button className='toggle_button' onClick={() => setMenuOpen(!menuOpen)}>{!menuOpen?<i class="fas fa-chevron-right"></i>: <i class="fas fa-chevron-left"></i>}</button>
         </div>
         <div className={menuOpen?"content":"content_expand"}>
            <Switch>
               <Route path='/header' component={Header}/>
               <Route path='/class/:classCode' component={ClassSection}/>
               <Route component={DefaultPage}/>
            </Switch>   
         </div>
      </div>
   )
}
