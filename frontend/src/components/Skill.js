import React from 'react';

function Skill({ title }) {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-xs font-semibold text-gray-700 mr-2">
      {title}
    </span>
  );
}

export default Skill;
