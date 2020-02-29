import React from 'react';

function Card(props) {
  return (
    <div className="w-full flex flex-col rounded-md overflow-hidden p-6 bg-white">
      {props.children}
    </div>
  );
}

export default Card;
