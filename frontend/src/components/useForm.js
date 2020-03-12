import { useState } from 'react';

const useForm = callback => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback(inputs);
  };

  const handleInputChange = event => {
    event.persist();
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: value
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useForm;
