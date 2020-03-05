import React, { Fragment } from 'react';

function SectionHeader({ title, children }) {
  return (
    <Fragment>
      <div className="flex justify-between w-full">
        <p className="text-xl text-black font-serif  font-bold tracking-wide -mb-4">
          {title}
        </p>
        {children}
      </div>
      <hr className="mt-4" />
    </Fragment>
  );
}

export default SectionHeader;
