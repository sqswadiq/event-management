import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './context/ContextAPI.jsx'
import {Provider} from 'react-redux'
import eventStore from './Redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>

      <Provider store={eventStore}>
        <ContextAPI>
          <BrowserRouter>
          <App/>
        </BrowserRouter>
        </ContextAPI>
      </Provider>
 
  </StrictMode>
)
