import React from 'react';

function Checkbox({ label, ...rest }) {
  return (
    <label className="flex my-3 w-full items-center">
      <input
        className="rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        type="checkbox"
        {...rest}
      />
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
    </label>
  );
}

export default Checkbox;
