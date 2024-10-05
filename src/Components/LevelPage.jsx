import { useParams } from 'react-router-dom';
import Card from './Card';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import "./LevelPage.css";

import levels from '../Levels/levels';

const LevelPage = () => {
  const { page, setPage, level: lvl } = useContext(AppContext);

  const { levelId } = useParams();
  const level = levels[levelId];
  //const nextLevelId = parseInt(levelId) + 1;
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  useEffect(
    () => {
      console.log(levelId, lvl);
      if(levelId > lvl) {
        setPage(lvl);
      }
      else if (levelId != page) {
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
      {(level && level.cards) && <div className="h-full text-white flex flex-col items-center justify-center space-y-8 p-4" style={{ margin: "auto" }}>
        <h2 className="text-2xl font-bold mb-8 text-center">Level {levelId}: {level.title}</h2>
        <div className="flex justify-center items-start flex-wrap">
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
      {(level && level.component) && <level.component />}
    </>
  );
};

export default LevelPage;