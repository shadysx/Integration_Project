import React, { useState } from 'react';

const ComboBox = ({ options, currentValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(currentValue);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue)
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default ComboBox;