
import React, {useState} from 'react'
import Modal from 'react-modal'
import {Switch, Route} from 'react-router-dom'

import Header from './components/header/Header'
import SideMenu from './components/sideMenu/SideMenu'
import ClassSection from './components/classSection/ClassSection'
import DefaultPage from './components/defaultPage/DefaultPage'
import DropzoneS3Uploader from './components/dropzoneS3Uploader/DropzoneS3Uploader'
import Demo from './components/dropzoneS3Uploader/Demo'

Modal.setAppElement(document.getElementById('root'));

export default function App() {
   const [menuOpen, setMenuOpen] = useState(false)
   return (
      <div className='app'>
         <div className={menuOpen?"menu":"menu menu_shrink"}>
            <SideMenu menuOpen={menuOpen}/>
            <button className='toggle_button' onClick={() => setMenuOpen(!menuOpen)}>{!menuOpen?<i className="fas fa-chevron-right"></i>: <i className="fas fa-chevron-left"></i>}</button>
         </div>
         <div className={menuOpen?"content":"content_expand"}>
            <Switch>
               <Route exact path='/uploadAssignment' component={Demo} />
               <Route path='/header' component={Header}/>
               <Route path='/class/:classCode' component={ClassSection}/>
               <Route path='/fileUpload/:assingmentId' component={DropzoneS3Uploader} />
               <Route component={DefaultPage}/>
            </Switch>   
         </div>
      </div>
   )
}
