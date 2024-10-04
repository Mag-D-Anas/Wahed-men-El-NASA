import { ChevronRight } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

const LandingPage = () => {

    const { level, page, setPage } = useContext(AppContext);
    useEffect(
      ()=>{
        if(page != 0) {
          setPage(0);
        }
      },[]
    )
    return (
      <div className="h-screen text-white flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold">Climate Story: Ice Age Adventure</h1>
        <p className="text-xl">Explore Earth's climate history through time</p>
        <button
          onClick={() => setPage(level)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          Start Journey <ChevronRight className="ml-2" />
        </button>
      </div>
    );
  };

export default LandingPage;