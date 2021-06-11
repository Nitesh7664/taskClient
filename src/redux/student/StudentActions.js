import axios from 'axios'

import {LOAD_STUDENT, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAILURE, EDIT_STUDENT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_FAILURE, ADD_STUDENT, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE, CLEAR_ERROR_MESSAGE} from './StudentTypes'

import {fetchClass} from '../class/classActions'

export const loadStudents = classCode => async dispatch => {
   
   dispatch({type: LOAD_STUDENT, payload: ''})
   try{
      const result = await axios.get(`http://localhost:5000/getStudents/${classCode}`)
      dispatch({type: LOAD_STUDENT_SUCCESS, payload: result.data.students})
   }catch(err){
      dispatch({type: LOAD_STUDENT_FAILURE, payload: err.response.data.message})
   }

}



export const addStudent = data => async dispatch => {
   
      dispatch({type: ADD_STUDENT, payload: ''})
   try{
      const result = await axios.post('http://localhost:5000/addStudent', data)
      dispatch(fetchClass(data.classCode))
      dispatch({type: ADD_STUDENT_SUCCESS, payload: result.data.student})
   }catch(err){
      console.log(err.response.data.message)
      dispatch({type: ADD_STUDENT_FAILURE, payload: err.response.data.message})
   }

}

export const editStudent = data => async dispatch => {
   
   dispatch({type: EDIT_STUDENT, payload: ''})
   try{
      const result = await axios.patch('http://localhost:5000/editStudent', data)
      dispatch({type: EDIT_STUDENT_SUCCESS, payload: result.data})
   }catch(err){
      dispatch({type: EDIT_STUDENT_FAILURE, payload: err.response.data.message})
   }

}

export const clearErrorMessage = () => dispatch => {
   console.log('clearErrorMessage')
   dispatch({type: CLEAR_ERROR_MESSAGE, payload: ''})
}
