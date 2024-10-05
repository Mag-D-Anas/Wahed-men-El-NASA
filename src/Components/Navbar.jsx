import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import levels from '../Levels/levels';

const Navbar = () => {
    const { level, page, setPage } = useContext(AppContext);
    const navigate = useNavigate();
    const { requiresCards, allCardsOpened } = useContext(AppContext);

    
    return (
        <nav className="bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                <img src="/logo.svg" className="h-10" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">EarthPulse</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {
                (page > 0 && page <= Object.keys(levels).length) && <button
                onClick={() => {
                    setPage(Number(page) - 1)
                    if(Number(page) - 1 == 0) {
                        navigate('/');
                    }
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center mr-1"
                >
                <ChevronLeft />
                </button>
            }
            {
                (page > 0 && page < Object.keys(levels).length) && <button
                onClick={() => setPage(Number(page) + 1)}
                className={`text-white font-bold py-2 px-4 rounded flex items-center ${allCardsOpened ? 'bg-blue-500 hover:bg-blue-600 ' : 'bg-gray-600'}`}
                disabled={(!allCardsOpened)}>
                {allCardsOpened ? <span className='max-sm:hidden'>{`Next: Level ${Number(page) + 1}`}</span> : <span>🔒<span className='max-sm:hidden'>Open all cards to proceed!</span></span> }
                {allCardsOpened && <ChevronRight className="ml-2" />}
                </button>
            }
            </div>
            
            
            </div>
        </nav>


    );
};

export default Navbar;