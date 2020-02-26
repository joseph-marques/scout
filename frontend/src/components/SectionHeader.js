import React, { Fragment } from 'react';

function SectionHeader({ title }) {
  return (
    <Fragment>
      <p className="text-xl text-black font-serif  font-bold tracking-wide -mb-4">
        {title}
      </p>
      <br />
      <hr />
    </Fragment>
  );
}

export default SectionHeader;
