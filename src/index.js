import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import store from './redux/store'
import App from './App'
import './index.css'


ReactDOM.render(
   <Provider store={store}>
      <React.StrictMode>
         <Router>
            <App />
         </Router>
      </React.StrictMode>
   </Provider>,
   document.getElementById('root')
)