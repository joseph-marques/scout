import React from 'react';
import StarRating from './StarRating';

function FullRating({ rating, count, size = 3 }) {
  return (
    <div className="flex items-center justify-center justify-center content-center">
      <div className="flex flex-1 items-center content-center justify-center">
        <span className="pr-3 text-sm text-gray-700">
          {parseFloat(rating).toFixed(1)}
        </span>
        <StarRating numStars={rating} size={size} />
      </div>
      <div className="flex-1 text-sm text-gray-700 text-center">
        {`${count} reviews`}
      </div>
    </div>
  );
}

export default FullRating;
