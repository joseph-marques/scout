import React from 'react';

function Radio({ label, name, onChange, checked }) {
  return (
    <label className="flex my-3 w-full flex-start items-center">
      <input
        className="rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        name={name}
        type="radio"
        onChange={onChange}
        checked={checked}
      />
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
    </label>
  );
}

export default Radio;
