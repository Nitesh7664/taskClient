import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '../header/Header'
import Students from '../students/Students'
import Loader from '../utility/Loader'
import {fetchClass} from '../../redux/class/classActions'
import styles from './ClassSection.module.css'

function ClassSection({data, fetchClass}) {

   let {classCode} = useParams()

   useEffect(() => {
      if(classCode)
         fetchClass(classCode)
   }, [fetchClass, classCode])

   return (
      data?
      <>
      <Header canvasSection={data.canvasSection} canvasAddress={data.canvasAddress}/>
      <div className={styles.breadcrumb}>
         <p>{"< MANAGE CLASS  /  GRADE 8 - B"}</p>
      </div>
      <div className={styles.class_container}>
         <div className={styles.section_image}>
            <img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/g-g1249nw.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c07a877bda231ea50550d3f4b1fb9902" alt="display" className={styles.image}/>
         </div>
         <div className={styles.section_container}>

            <div className={styles.section}>
               <p className="black">class code: <span className={styles.heading_text}>{data.classCode}</span></p>
               <p className="black">total students: <span className={styles.heading_text}>{data.totalStudents}</span></p>
               <p className="black">teacher: <span className={styles.heading_text}>{data.teacher}</span></p>
            </div>
            <div className={styles.section}>
               <p>grade: <span className="black">other</span></p>
               <p>subject: <span className="black">{data.subject}</span></p>
               <p>standard: <span className="black">other</span></p>
            </div>
            <div className={styles.section}>
               <p>start date: <span className="black">{data.startDate}</span></p>
               <p>end date: <span className="black">{data.endDate}</span></p>
            </div>
            <div className={styles.section}>
               <p></p>
               <p></p>
               <p>last sync: <span className="black">may 05, 2021</span></p>
            </div>
            <div className={styles.section}>
               <p>canvas section: <span className="black">{data.canvasSection}</span></p>
               <p></p>
               <p>canvas course: <span className="black">{data.canvasCourse}</span></p>
            </div>
         
         </div>
      </div>
      <div className={styles.hr}></div>
      <Students classCode={classCode}/>
      </>
      :<Loader />
   )
}

ClassSection.propTypes = {
   data: PropTypes.object.isRequired,
   fetchClass: PropTypes.func.isRequired
}

const mapStateToProps = state => {
   return {data: state.class.classData}
}

export default connect(mapStateToProps, {fetchClass})(ClassSection)
