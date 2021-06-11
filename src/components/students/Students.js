import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import Student from './Student'
import styles from './Student.module.css'
import Loader from '../utility/Loader'
import {loadStudents, addStudent, editStudent, clearErrorMessage} from '../../redux/student/StudentActions'

const customStyles = {
   overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: '3'
   },
   content : {
      top: '50%',
      left: '50%',
      width: '90%',
      maxWidth: '500px',
      height: 'fit-content',
      transform: 'translate(-50%, -50%)'
   }
 };

function Students({data, loadStudents, addStudent, editStudent, classCode, clearErrorMessage}) {

   const [username, setUsername] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [checkedCheckbox, setCheckedCheckbox] = useState({})
   const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
   const [sortBase, setSortBase] = useState({field: 'name', order: 1})
   const [formErrorMessage, setFormErrorMessage] = useState('')
   const [showActiveStudents, setShowActiveStudents] = useState(true)

   const [modalIsOpen,setIsOpen] = React.useState(false);
   
   useEffect(() => {

      loadStudents(classCode)
   }, [loadStudents])
   
   const openModal = () => {
      setIsOpen(true);
   }

   const afterOpenModal = () => {
   }

   const closeModal = () => {
      clearInputFields()
      setIsOpen(false);
      setFormErrorMessage('')
   }

   const addStudentToClass = (e) => {
      e.preventDefault()
      if(isValid()){
         const postStudentData = {
            name, username, password, classCode
         }
         addStudent(postStudentData)
         clearInputFields()
         closeModal()
      }
   }

   const clearInputFields = () => {
      setName('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
   }

   const handleCheckboxChange = (e, _username) => {
         if(e.target.checked === true){
            addToCheckbox(_username)
         }else{
            removeFromCheckbox(_username)
         }
   }

   const addToCheckbox = _username => {
      let updatedCheckedCheckbox = {...checkedCheckbox}
      updatedCheckedCheckbox[_username] = _username
      setCheckedCheckbox(updatedCheckedCheckbox)
   }

   const removeFromCheckbox = _username => {
      let updatedCheckedCheckbox = {...checkedCheckbox}
      delete updatedCheckedCheckbox[_username]
      setCheckedCheckbox(updatedCheckedCheckbox)
   }

   const handleAdd = () => {
      setIsEditButtonClicked(false)
      openModal()
   }

   const handleEdit = (data) => {
      setName(data.name)
      setUsername(data.username)
      setIsEditButtonClicked(true)
      openModal()
   }

   const editStudentInClass = (e) => {
      e.preventDefault()
      if(isValid()){
         const updatedStudentData = {
            name, username, password, classCode
         }
         editStudent(updatedStudentData)
         delete checkedCheckbox[username] 
         clearInputFields()
         setIsEditButtonClicked(false)
         closeModal()
      }  
   }

   const isValid = () => {
      if(username.length < 5 || username.length > 30) {
         setFormErrorMessage('username should be between 5 - 30 characcters')
         return false
      }
      if(name.length < 3 || name.length > 30) {
         setFormErrorMessage('name should be between 3 - 30 characcters')
         return false
      }
      if(password.length < 6 || password.length > 30) {
         setFormErrorMessage('Password Field should be between 6 - 30 characcters')
         return false
      }
      if(confirmPassword.length < 6 || confirmPassword.length > 30) {
         setFormErrorMessage('Confirm Password Field Field should be between 6 - 30 characcters')
         return false
      }
      if(password.localeCompare(confirmPassword) !== 0) {
         setFormErrorMessage('Password and Confirm Password do not match')
         return false
      }

      return true
   }

   const handleCompare = (a, b) => {
      if(sortBase.field !== 'status')
         if(sortBase.order === 1)
            return a[sortBase.field].localeCompare(b[sortBase.field]) === 0? a.username.localeCompare(b.username): a[sortBase.field].localeCompare(b[sortBase.field])
         else
            return b[sortBase.field].localeCompare(a[sortBase.field]) === 0? b.username.localeCompare(a.username): b[sortBase.field].localeCompare(a[sortBase.field])
      else
         if(sortBase.order === 1)
            return a.status === b.status? 0: b.status - a.status
         else
            return a.status === b.status? 0: a.status - b.status
   }

   const selectAll = (e) => {
      let studentsData = data.studentsData.filter(studentData => {
         if(showActiveStudents && studentData.status === 1) return true
         else if(!showActiveStudents) return true;
         else return false
      })
      let studentUsernames = studentsData.map(studentData => studentData.username)

      let nodes = studentUsernames.map(studentUsername => document.getElementById(studentUsername))

      let updatedCheckedCheckbox = {...checkedCheckbox}

      if(e.target.checked){
         for(let studentUsername of studentUsernames)
            updatedCheckedCheckbox[studentUsername] = studentUsername
         
         setCheckedCheckbox(updatedCheckedCheckbox)

         for(let node of nodes){
            node.checked = true 
         }
      }else{
         for(let studentUsername of studentUsernames)
            delete updatedCheckedCheckbox[studentUsername]

         setCheckedCheckbox(updatedCheckedCheckbox)
         for(let node of nodes){
            node.checked = false 
         }
      }
   }

   const doNothing = () => {
      alert("Does Nothing")
   }


   return (
      data.isLoading?
         <Loader />:
         data.studentsData?
            <div>
               <div className={styles.action_container}>
                  <hr />
                  <div className={styles.left}> 
                     <p>show active student</p> 
                     <div className={styles.toggle_wrapper}>
                        <input type="checkbox" name="toggle" id="toggle" onChange={(e) => setShowActiveStudents(e.target.checked)} defaultChecked className={styles.toggle}/>
                        <label htmlFor="toggle" className={styles.onBtn}>On</label>
                        <label htmlFor="toggle" className={styles.offBtn}>Off</label>
                     </div>
                  </div>
                  <div className={styles.right}> 
                     <button onClick={handleAdd} className={`${styles.button} ${styles.white}`}><i className="fas fa-plus-circle green"></i> add student</button>
                     <button className={`${styles.button} ${styles.green}`} onClick={doNothing}><i className="fas fa-plus-circle white"></i> add multiple students</button>
                     <button className={`${styles.button} ${styles.white}`} onClick={doNothing}><i className="fas fa-print green" ></i> Print</button>
                     <button className={`${styles.button} ${styles.white}`} onClick={doNothing}>actions</button>
                  </div>
               </div>
               <br /><br /><br />
               {
                        data.error.length > 0?
                        <>
                           <div className={styles.error_message_container}>
                              <p className={styles.error_message}>{data.error}</p>
                              <button onClick={() => clearErrorMessage()} className={styles.close_error_message}><i class="fas fa-times"></i></button>
                           </div>
                           <br /><br />
                        </>
                        : null
               }
               <div className={styles.student_table}>
                  <div className={styles.row}>
                     <p className={styles.check_box}><input type="checkbox" name="selectAll" id="selectAll" onClick={selectAll}/></p>
                     <div className={`${styles.info}`}>
                        <p className={styles.sort_container}>
                           NAME
                           <i className={`fas fa-sort-up ${styles.sort_icon_up}`} onClick={() => setSortBase(oldState => ({...oldState, field:'name', order: 1}))}></i>
                           <i className={`fas fa-sort-down ${styles.sort_icon_down}`} onClick={() => setSortBase({field:'name', order: -1})}></i>
                        </p>
                     </div>
                     <div className={`${styles.info}`}>
                        <p className={styles.sort_container}>
                           USERNAME
                           <i className={`fas fa-sort-up ${styles.sort_icon_up}`} onClick={() => setSortBase(oldState => ({...oldState, field:'username', order: 1}))}></i>
                           <i className={`fas fa-sort-down ${styles.sort_icon_down}`} onClick={() => setSortBase({field:'username', order: -1})}></i>
                        </p>
                     </div>
                     <p className={`${styles.info} ${styles.center}`}>IT'S ENABLED</p>
                     <p className={`${styles.info} ${styles.center}`}>CANVAS USER</p>
                     <div className={`${styles.info} ${styles.center}`}>
                        <p className={styles.sort_container}>
                           STATUS
                           <i className={`fas fa-sort-up ${styles.sort_icon_up}`} onClick={() => setSortBase(oldState => ({...oldState, field:'status', order: 1}))}></i>
                           <i className={`fas fa-sort-down ${styles.sort_icon_down}`} onClick={() => setSortBase({field:'status', order: -1})}></i>
                        </p>
                     </div>
                     <p className={`${styles.edit} ${styles.center}`}></p>
                  </div>
                  {
                     data.studentsData
                     .sort(handleCompare)
                     .map(studentData => {
                        if(showActiveStudents && studentData.status === 1)
                           return <Student key={studentData.username} checkedCheckbox={checkedCheckbox} data={studentData} handleCheckboxChange={handleCheckboxChange} handleEdit={handleEdit}/>
                        else if(!showActiveStudents)
                           return <Student key={studentData.username} checkedCheckbox={checkedCheckbox} data={studentData} handleCheckboxChange={handleCheckboxChange} handleEdit={handleEdit}/>
                     })
                  }
               </div>
               <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Student"
               >

                  <form className={styles.form} onSubmit={(e) => isEditButtonClicked? editStudentInClass(e): addStudentToClass(e)}>
                     <div className={styles.form_heading}>
                        <p className={styles.form_heading_left}>
                           <i className={`fas fa-user ${styles.form_heading_left_icon}`}> </i>
                           <div>{isEditButtonClicked? "Edit": "Add"} a Student</div>
                        </p>
                        <button className={styles.form_heading_right} onClick={closeModal}>
                            &times;
                        </button>
                     </div>
                     {
                        formErrorMessage.length > 0?
                        <div className={styles.error_message_container}>
                           <p className={styles.error_message}>{formErrorMessage}</p>
                           <button onClick={() => setFormErrorMessage('')} className={styles.close_error_message}><i class="fas fa-times"></i></button>
                        </div>
                        : null
                     }
                     <div>
                        <label className={styles.label} htmlFor="username">USERNAME</label>
                        <br /><br />
                        <div className={styles.input_container}>
                        <input className={styles.input_text} type="email" name="username" id="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isEditButtonClicked}/>
                        <p className={styles.psuedo_icon}><i class="fas fa-envelope"></i></p>
                        </div>
                        <br />
                     </div>
                     <div>
                        <label className={styles.label} htmlFor="name">NAME OF USER</label>
                        <br /><br />
                        <div className={styles.input_container}>
                        <input className={styles.input_text} type="text" name="name" id="name" placeholder="Enter the name of the user" onChange={(e) => setName(e.target.value)} value={name}/>
                        <p className={styles.psuedo_icon}><i class="fas fa-user"></i></p>
                        </div>
                        <br />
                     </div>
                     <div>
                        <label className={styles.label} htmlFor="password">PASSWORD</label>
                        <br /><br />
                        <div className={styles.input_container}>
                        <input className={styles.input_text} type="password" name="password" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <p className={styles.psuedo_icon}><i class="fas fa-lock"></i></p>
                        </div>
                        <br />
                     </div>
                     <div>
                        <label className={styles.label} htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                        <br /><br />
                        <div className={styles.input_container}>
                        <input className={styles.input_text} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                        <p className={styles.psuedo_icon}><i class="fas fa-lock"></i></p>
                        </div>
                        <br />
                     </div>
                     <div>
                        <div className={`${styles.input_text} ${styles.additional_detail}`}>
                           <p className='green'>CONFIGURE ADDITIOANAL DETAILS</p>
                           <i class="fas fa-sort-down"></i>
                        </div>
                        <br />
                     </div>
                     <div className={styles.modal_button_container}>
                        <button onClick={closeModal} className={`${styles.button} ${styles.white}`}>NO, CANCEL</button>
                        {isEditButtonClicked?
                           <input type="submit" value="YES, EDIT STUDENT" className={`${styles.button} ${styles.pd_5} ${styles.green}`}/>
                        :
                           <input type="submit" value="YES, ADD STUDENT" className={`${styles.button} ${styles.green} ${styles.pd_5}`}/>
                        }
                        
                     </div>
                  </form>
                  
               </Modal>

            </div>
         :<h1>{data.error}</h1>
   )
}

Students.propTypes = {
   data: PropTypes.object.isRequired, 
   loadStudents: PropTypes.func.isRequired, 
   addStudent: PropTypes.func.isRequired, 
   editStudent: PropTypes.func.isRequired, 
   classCode: PropTypes.string.isRequired, 
   clearErrorMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   data: state.student
})

export default connect(mapStateToProps, {loadStudents, addStudent, editStudent, clearErrorMessage})(Students)
