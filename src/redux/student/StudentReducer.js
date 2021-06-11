import {LOAD_STUDENT, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_FAILURE, EDIT_STUDENT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_FAILURE, ADD_STUDENT, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE, CLEAR_ERROR_MESSAGE} from './StudentTypes'

const initialState = {
   isLoading: false,
   studentsData: null,
   error: ''
}

const StudentReducer = (state=initialState, action) => {

   const {type, payload} = action

   switch(type){
      case LOAD_STUDENT:
      case ADD_STUDENT:
      case EDIT_STUDENT:
            return {
               ...state,
               isLoading: true
            }
      case LOAD_STUDENT_SUCCESS: 
            return {
               ...state,
               isLoading: false,
               studentsData: payload,
               error: ''
            }
      case ADD_STUDENT_SUCCESS:
         const newStudentData = [
            ...state.studentsData,
            payload
         ] 

         return {
            ...state,
            isLoading: false,
            error: '',
            studentsData: newStudentData
         }

      case EDIT_STUDENT_SUCCESS:
         const editedStudentData = state.studentsData.map(student => student.username === payload.username? payload: student)
         return {
            ...state,
            isLoading: false,
            error: '',
            studentsData: editedStudentData
         }
      case LOAD_STUDENT_FAILURE:
      case ADD_STUDENT_FAILURE:
      case EDIT_STUDENT_FAILURE:    
         return {
            ...state,
            isLoading: false,
            error: payload
         }
      case CLEAR_ERROR_MESSAGE:
         return {
            ...state,
            error: payload
         }
       default: 
         return {
            ...state
         }  
   }
}

export default StudentReducer
