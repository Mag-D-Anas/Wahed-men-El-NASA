import { Link, useParams } from 'react-router-dom';
import InteractiveMap from './InteractiveMap';
import Card from './Card';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Component } from 'lucide-react';
import MapLevel3 from '../Levels/MapLevel3';
import MapLevel3B from '../Levels/MapLevel3B';
import "./LevelPage.css";
import FingerPrintPanel from './FingerPrintPanel';

const levels = {
  1: {
    title: "Ice Age Beginnings",
    cards: [
      {
        title: 'Why Not Mars',
        description: 'Scientists are searching for a new planet to explore, and many ask, “Why not Mars?”',
        thumbnail: '/level1/card1.png',
        content: (
          <div>
            <p>Well, the atmosphere is key if you’re thinking of leaving Earth behind. Mars has a thin atmosphere—95% carbon dioxide, with small amounts of nitrogen and argon. It’s not breathable, and with barely any air pressure, you’d need a suit just to survive.</p>
            <img src="/level1/mars.gif" alt="Mars" className="mt-4"
              style={
                {
                  width: "70%",
                  margin: "auto",
                  marginTop: "12px",
                  marginBottom: "12px",
                  height: "auto",
                  borderRadius: "12px"
                }
              }
            />
            <p><b>Interesting fact:</b> 4.5 billion years ago, Earth’s atmosphere wasn’t too different. It was filled with water vapor, carbon dioxide, and nitrogen due to volcanic activity—no oxygen to breathe.</p>
          </div>
        )
      },
      {
        title: 'Pleistocene',
        description: 'Careful, or you’ll drift away, like the beasts from Pleistocene’s day!',
        thumbnail: '/ice.jpeg',
        content: (
          <div>
            <p className='text-center'>The Pleistocene Epoch, known as the "Ice Age," was a period of dramatic climate shifts, with glaciers advancing and retreating. It was home to iconic megafauna:</p>
            <div className="cards">
              <div className="card">
                <img src="/level1/Irish_Elk.jpg" alt="Mammoth" />
                <h2 className='font-bold'>Mammoth</h2>
                <p>Features Had enormous antlers, spanning up to 3.6 meters (12 feet) across.
                  Habitat Roamed Europe, Asia, and North Africa.
                  Extinction Died out about 7,700 years ago, possibly due to habitat changes and hunting.</p>
              </div>
              <div className="card">
                <img src="/level1/woolly-mammoth.jpg" alt="woolly-mammoth" />
                <h2 className='font-bold'>Woolly-mammoth</h2>
                <p>Woolly mammoths were 3 to 3.7 meters tall, weighed up to 7,300 kg, and had thick fur and fat for insulation. They were herbivores, eating tundra plants.</p>
              </div>
              <div className="text-center card">
                <img src="/level1/mastodon.jpg" alt="Mastodon" />
                <h2 className='font-bold text-center'>Mastodon</h2 >
                <p>Features: Similar to woolly mammoths but with straighter tusks and different teeth adapted for browsing.
                  Habitat: Inhabited forests and woodlands across North America.
                  Extinction: Extinct around 10,000 years ago, likely due to climate changes and human activity. </p>
              </div>
            </div>
          </div>
        )
      },
    ]
  },
  2: {
    title: "N2o Interactive Map",
    component: MapLevel3
  },
  3: {
    title: "CO2 Interactive Map",
    component: MapLevel3B
  },
  4:{
    title:"Quiz",
    component:FingerPrintPanel
  }
};

const LevelPage = () => {
  const { page, setPage } = useContext(AppContext);

  const { levelId } = useParams();
  const level = levels[levelId];
  //const nextLevelId = parseInt(levelId) + 1;
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  useEffect(
    () => {
      if (levelId != page) {
        setPage(levelId);
      }
    }, []
  )

  const handleCardClick = (index) => {
    setExpandedCardIndex(index);
  };

  const handleCardClose = () => {
    setExpandedCardIndex(null);
  };

  return (
    <>
      {level.cards && <div className="h-screen text-white flex flex-col items-center justify-center space-y-8 p-4" style={{ margin: "auto" }}>
        <h2 className="text-2xl font-bold mb-8 text-center">Level {levelId}: {level.title}</h2>
        <div className="flex justify-center items-start space-x-8 flex-wrap">
          {level.cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              thumbnail={card.thumbnail}
              onClick={() => handleCardClick(index)}
              isExpanded={expandedCardIndex === index}
              onClose={handleCardClose}
            >
              {card.content}
            </Card>
          ))}
        </div>
        {/* {levels[nextLevelId] && (
          <div className="text-center mt-8">
            <Link
              to={`/level/${nextLevelId}`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Next Level
            </Link>
          </div>
        )} */}
      </div>}
      {level.component && <level.component />}
    </>
  );
};

export default LevelPage;