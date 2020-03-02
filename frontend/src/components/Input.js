import React from 'react';

function Input({ label, name, type, placeholder }) {
  return (
    <label className="flex flex-col my-3">
      <p className="px-2 text-sm text-sm text-gray-200">{label}</p>
      <input
        className="rounded-md p-2 border-transparent focus:border-secondary border-2"
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;
