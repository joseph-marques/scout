import React from 'react';

function Card(props) {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg p-6 bg-white">
      {props.children}
    </div>
  );
}

export default Card;
