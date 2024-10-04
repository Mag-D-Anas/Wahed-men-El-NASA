import { createContext, useEffect, useState } from 'react'
import './App.css'
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LevelPage from './Components/LevelPage';
import Navbar from './Components/Navbar';
import Chart from './Components/Chart';
import Maps from './Components/Maps';

const AppContext = createContext();
const Home = () => {
  const [page, setPage] = useState(0);
  const [level, setLevel] = useState(Number(localStorage.getItem('level')) || 1); // level 0 is landing page
  const navigate = useNavigate();
  useEffect(() => {
    if(page != 0) {
      localStorage.setItem('level', page);
      setLevel(page);
      navigate(`/level/${page}`);
    }
  }, [page]);
  return (<AppContext.Provider value={{ level, setLevel, page, setPage }}>
    <div className="min-h-screen" id='main-app'>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/chart" element={<Chart gas={"ch4"} />} />
        <Route path="/maps" element={<Maps />} />
      </Routes>
    </div>
  </AppContext.Provider>);
}
function App() {

  return (
    <Router>
      <Home />
    </Router>
  )
}

export default App
export { AppContext }
