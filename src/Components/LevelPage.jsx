import { Link, useParams } from 'react-router-dom';
import InteractiveMap from './InteractiveMap';
import Card from './Card';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

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
          title: 'Ice Age Animals',
          description: 'Discover the fascinating creatures that roamed Earth during the Ice Age.',
          thumbnail: '/ice.jpeg',
          content: (
            <div>
              <p>The Ice Age, a period in Earth's history when large ice sheets covered vast areas of land, was home to a diverse array of fascinating animals, many of which are now extinct. Some of the most iconic Ice Age animals include:</p>
              <ul className="list-disc list-inside mt-4">
                <li>Woolly Mammoth: A large, elephant-like creature with long curved tusks and a thick coat of fur.</li>
                <li>Saber-toothed Cat: A predator with long, curved canine teeth, not closely related to modern cats.</li>
                <li>Giant Ground Sloth: A large, slow-moving herbivore that could reach the size of an elephant.</li>
                <li>Woolly Rhinoceros: Similar to modern rhinos but adapted to cold climates with a woolly coat.</li>
                <li>Dire Wolf: A larger relative of modern wolves, known for its powerful jaws.</li>
                <li>Mastodon: Often confused with mammoths, these were shorter and stockier with straighter tusks.</li>
              </ul>
              <p className="mt-4">These animals evolved various adaptations to survive in the harsh, cold environments of the Ice Age, such as thick fur coats, layers of blubber, and specialized diets.</p>
            </div>
          )
        },
      ]
    },
    2: {
      title: "Climate Through Time",
      cards: [
        {
          title: 'Interactive Climate Map',
          description: 'Explore how Earth\'s climate has changed over time with our interactive map.',
          thumbnail: '/ice.jpeg',
          content: <InteractiveMap />
        },
        {
          title: 'Timeline of Earth\'s Climate',
          description: 'Journey through the major climate events in Earth\'s history.',
          thumbnail: '/ice.jpeg',
          content: (
            <div>
              <p>Earth's climate has undergone significant changes throughout its 4.5-billion-year history. Here's a brief timeline of major climate events:</p>
              <ul className="list-disc list-inside mt-4">
                <li>4.6 billion years ago: Earth forms, initially very hot due to formation processes and radioactive decay.</li>
                <li>4.0-3.8 billion years ago: The first atmosphere forms, mostly of hydrogen and helium.</li>
                <li>2.4 billion years ago: The Great Oxygenation Event, where oxygen starts accumulating in the atmosphere.</li>
                <li>720-635 million years ago: The "Snowball Earth" period, when the planet was covered almost entirely in ice.</li>
                <li>56 million years ago: The Paleocene-Eocene Thermal Maximum, a period of rapid, intense warming.</li>
                <li>2.6 million years ago - 11,700 years ago: The Pleistocene epoch, characterized by repeated glacial cycles.</li>
                <li>11,700 years ago - present: The Holocene epoch, a period of relatively stable and warm climate.</li>
                <li>1750 CE - present: The Anthropocene, marked by significant human impact on Earth's climate and ecosystems.</li>
              </ul>
              <p className="mt-4">This timeline showcases the dynamic nature of Earth's climate and the various factors that have influenced it over billions of years.</p>
            </div>
          )
        },
      ]
    }
};
  
const LevelPage = () => {
    const { page, setPage } = useContext(AppContext);

    const { levelId } = useParams();
    const level = levels[levelId];
    const nextLevelId = parseInt(levelId) + 1;
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  
    useEffect(
      ()=>{
        if(levelId != page) {
          setPage(levelId);
        }
      },[]
    )
    
    const handleCardClick = (index) => {
      setExpandedCardIndex(index);
    };
  
    const handleCardClose = () => {
      setExpandedCardIndex(null);
    };
  
    return (
      <div className="h-screen text-white flex flex-col items-center justify-center space-y-8 p-4" style={{margin: "auto"}}>
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
        {levels[nextLevelId] && (
          <div className="text-center mt-8">
            <Link
              to={`/level/${nextLevelId}`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Next Level
            </Link>
          </div>
        )}
      </div>
    );
  };

export default LevelPage;