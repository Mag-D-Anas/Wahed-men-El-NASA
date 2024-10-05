import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Question from './Components/Question.jsx'
import FingerPrintPanel from './Components/FingerPrintPanel.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <FingerPrintPanel/> */}
  </StrictMode>,
)
