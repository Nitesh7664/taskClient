import {LOAD_CLASS, LOAD_CLASS_SUCCESS, LOAD_CLASS_FAILURE} from './classTypes'

const initialState = {
   isLoading: false,
   classData: null,
   error: ''
}

const classReducer = (state = initialState, action) => {
   const {type, payload} = action

   switch(type){
      case LOAD_CLASS:
         return {
            ...state,
            error: '',
            isLoading: true
         }
      case LOAD_CLASS_SUCCESS:
         return {
            ...state,
            classData: payload,
            isLoading: false,
            error: ''
         }
      case LOAD_CLASS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: ''
         }
      default:
         return {
            ...state
         }
   }

}

export default classReducer