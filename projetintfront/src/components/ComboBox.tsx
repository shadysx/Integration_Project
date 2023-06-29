import React, { useState } from 'react';

const ComboBox = ({ options, currentValue, onChange }) => {
  // Déclare un état local "selectedOption" avec la valeur initiale "currentValue"
  const [selectedOption, setSelectedOption] = useState(currentValue);

  // Fonction de gestion du changement de sélection
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Met à jour la valeur de "selectedOption" avec la nouvelle sélection
    onChange(selectedValue); // Appelle la fonction de rappel "onChange" avec la nouvelle sélection comme argument
    console.log("Combo ", selectedValue); // Affiche la valeur sélectionnée dans la console
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Select an option</option>
      {/* Génère les options en utilisant les valeurs de "options" */}
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default ComboBox;