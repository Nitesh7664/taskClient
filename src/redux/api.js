import axios from 'axios'

export const addStudentAPI = async data => {
   try{
      const result = await axios.post('http://localhost:5000/addStudent')
      console.log(result.data)
      return result.data
   }catch(err){
      console.log(err)
      return err
   }
}