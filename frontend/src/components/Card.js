import React from 'react';

function Card(props) {
  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
      {props.children}
    </div>
  );
}

export default Card;
