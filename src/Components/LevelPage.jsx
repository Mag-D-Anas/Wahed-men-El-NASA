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

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [cardsOpened, setCardsOpened] = useState({});
  const { setAllCardsOpened, SetRequiresCards } = useContext(AppContext);

  useEffect(
    () => {
      console.log(levelId, lvl);
      if(levelId > lvl) {
        setPage(lvl);
      }
      else if (levelId != page) {
        setPage(levelId);
      }
      if(level && level.cards && levelId >= lvl) {
        SetRequiresCards(true);
        setAllCardsOpened(false);
      }
      else {
        SetRequiresCards(false);
        setAllCardsOpened(true);

        if(level && level.cards) {
          let cOpened = {};
          for (let i = 0; i < level.cards.length; i++) {
            cOpened[i] = true;
          }
          setCardsOpened(cOpened);
        }
      }
    }, []
  )

  useEffect(() => {
    if(!level || !level.cards) return;
    if (Object.keys(cardsOpened).length === level.cards.length) {
      setAllCardsOpened(true);
      console.log('All cards opened');
    }
  }, [cardsOpened]);

  const handleCardClick = (index) => {
    if(!cardsOpened[index]) {
      setCardsOpened({...cardsOpened, [index]: true});
    }
    
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
              isOpened={cardsOpened[index]}
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