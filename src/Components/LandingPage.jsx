import { ChevronRight } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

const LandingPage = () => {

    const { level, setLevel, page, setPage } = useContext(AppContext);
    useEffect(
      ()=>{
        if(page != 0) {
          setPage(0);
        }
      },[]
    )
    return (
      <div className="h-full flex-grow text-white flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold flex items-center"><img src="/logo.svg" className="h-11" alt="Flowbite Logo" />EarthPulse</h1>
        <p className="text-xl text-center">Explore Earth's climate history through time</p>
        <div className="flex flex-row max-md:flex-col">
        <button
          onClick={() => {
            setLevel(1)
            setPage(1)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mx-2 max-md:m-2"
        >
          Start New Journey <ChevronRight className="ml-2" />
        </button>
        {
            level > 1 && <button
            onClick={() => setPage(level)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mx-2"
            >
            Continue Journey: Level {level} <ChevronRight className="ml-2" />
            </button>
          }
        </div>
        
      </div>
    );
  };

export default LandingPage;