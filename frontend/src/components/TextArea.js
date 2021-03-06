import React from 'react';

function TextArea({ label, ...rest }) {
  return (
    <label className="flex flex-col my-3 w-full">
      <p className="px-2 text-sm text-sm text-gray-700">{label}</p>
      <textarea
        className="w-full rounded-md p-2 bg-gray-200 border-transparent focus:border-secondary border-2"
        {...rest}
      />
    </label>
  );
}

export default TextArea;
