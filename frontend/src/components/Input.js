import React from 'react';

function Input({ label, light = false, ...rest }) {
  const defaultInputStyle =
    'w-full rounded-md p-2 border-transparent focus:border-secondary border-2 bg-gray-200';
  const lightInputStyle = `${defaultInputStyle} bg-gray-200`;
  const defaultLabelStyle = 'px-2 text-sm text-sm text-gray-200';
  const lightLabelStyle = `${defaultLabelStyle} text-gray-700`;
  return (
    <label className="flex flex-col my-3">
      <p className={light ? lightLabelStyle : defaultLabelStyle}>{label}</p>
      <input
        className={light ? lightInputStyle : defaultInputStyle}
        {...rest}
      />
    </label>
  );
}

export default Input;
