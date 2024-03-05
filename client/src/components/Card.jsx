// CardComponent.js
import React from 'react';

const Card = ({ imageUrl, heroText }) => {
  return (
        <div className="relative transition-all rounded-lg duration-1000 overflow-hidden w-96 h-96 hover:cursor-pointer">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Card Image"
        className="object-cover w-full h-full transition-transform transform"
      />

      {/* Hero Text (Initially hidden) */}
      <div className="absolute top-0 left-0 w-full transition-backdrop duration-300 h-full flex items-center justify-center opacity-0 hover:backdrop-blur-lg hover:opacity-100 transition-opacity">
        <h2 className="text-white text-3xl font-bold">{heroText}</h2>
      </div>
    </div>
  );
};

export default Card;
