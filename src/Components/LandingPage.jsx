import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  
    return (
      <div className="h-screen text-white flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold">Climate Story: Ice Age Adventure</h1>
        <p className="text-xl">Explore Earth's climate history through time</p>
        <button
          onClick={() => navigate('/level/1')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          Start Journey <ChevronRight className="ml-2" />
        </button>
      </div>
    );
  };

export default LandingPage;