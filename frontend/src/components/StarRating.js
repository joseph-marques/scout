import React from 'react';
import { ReactComponent as Star } from '../icons/star-1.svg';

function StarRating({ numStars, size = 3 }) {
  const rounded = Math.round(numStars);
  const stars = Array.from(Array(rounded), (_, i) => (
    <Star key={i} className={`w-${size} h-${size} mr-1 -mt-1`} />
  ));

  return <div className="flex -pt-1">{stars}</div>;
}

export default StarRating;
