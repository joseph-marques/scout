import React from 'react';
import ScoutCard from './ScoutCard';

function ScoutList(props) {
  const renderScouts = () => {
    return props.scouts.map(scout => {
      return (
        <div
          key={scout.id}
          className="px-1 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/3"
        >
          <ScoutCard scout={scout} />
        </div>
      );
    });
  };

  return (
    <div className="flex flex-wrap overflow-hidden px-4 py-4">
      {renderScouts()}
    </div>
  );
}

export default ScoutList;
