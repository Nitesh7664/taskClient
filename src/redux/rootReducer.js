import {combineReducers} from 'redux'

import classReducer from './class/classReducer'
import studentReducer from './student/StudentReducer'

const rootReducer = combineReducers({
   class: classReducer,
   student: studentReducer
})

export default rootReducer