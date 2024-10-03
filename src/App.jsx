import { useState } from 'react'
import './App.css'
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LevelPage from './Components/LevelPage';
import CardContent from './Components/CardContent';

function App() {
  return (
    <Router>
      <div className="min-h-screen" id='main-app'>
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/level/:levelId" element={<LevelPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
