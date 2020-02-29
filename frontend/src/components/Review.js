import React from 'react';
import StarRating from './StarRating';

function Review({ review }) {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col w-1/6 flex-none">
        <p className="text-black font-medium pr-4">{review.name}</p>
      </div>
      <div className="flex flex-col flex-auto">
        <div className="py-2">
          <StarRating numStars={review.rating} size={4} />
        </div>
        <p className="text-sm text-gray-700">{review.description}</p>
      </div>
    </div>
  );
}

export default Review;
