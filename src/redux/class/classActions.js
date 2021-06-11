import axios from 'axios'

import {LOAD_CLASS, LOAD_CLASS_SUCCESS, LOAD_CLASS_FAILURE} from './classTypes'

export const fetchClass = classCode => async dispatch => {

      dispatch({type: LOAD_CLASS, payload: ''})
   try{
      const fetchedData = await axios(`http://localhost:5000/getClass/${classCode}`)
      dispatch({
         type: LOAD_CLASS_SUCCESS,
         payload: fetchedData.data
      })

   }catch(err){
      dispatch({
         type: LOAD_CLASS_FAILURE,
         payload: err.response.data.message
      })
   }


}
