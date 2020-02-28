import React from 'react';
import { ReactComponent as Star } from '../icons/star-1.svg';

function FullRating(props) {
  const renderStars = () => {
    const numStars = Math.round(props.rating);
    return Array.from(Array(numStars), (_, i) => (
      <Star key={i} className="w-3 h-3 mr-1" />
    ));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-1 items-center justify-center">
        <span className="pr-3 text-sm text-gray-700">
          {parseFloat(props.rating).toFixed(1)}
        </span>
        {renderStars()}
      </div>
      <div className="flex-1 text-sm text-gray-700 text-center">
        {`${props.count} reviews`}
      </div>
    </div>
  );
}

export default FullRating;
