import React from 'react'
import Card from './Card';

const Level = ({ cards }) => (
    <div className="flex justify-center items-start space-x-8 p-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          thumbnail={card.thumbnail}
          to={card.to}
        />
      ))}
    </div>
  );

export default Level