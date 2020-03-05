import React from 'react';

function LightInput({ label, name, type, placeholder, value, onChange }) {
  return (
    <label className="flex flex-col my-3 w-full">
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
      <input
        className="w-full rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
      />
    </label>
  );
}

export default LightInput;
