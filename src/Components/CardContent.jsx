import { Link, useParams } from 'react-router-dom';

const CardContent = () => {
    const { levelId, cardId } = useParams();
    const card = levels[levelId].cards[cardId];
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
        {card.content}
        <Link
          to={`/level/${levelId}`}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Cards
        </Link>
      </div>
    );
  };

export default CardContent;