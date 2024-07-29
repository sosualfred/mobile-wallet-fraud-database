// src/components/radioButton.jsx
// This component renders a single radio button with a label.

import React from 'react';

// RadioButton component
// Props:
// - label: The label for the radio button.
// - name: The name of the radio button group.
// - value: The value of the radio button.
// - checked: Whether the radio button is currently checked.
// - onChange: The function to call when the radio button changes.
// - props: Additional props to pass to the radio button.
const RadioButton = ({ label, name, value, checked, onChange, ...props }) => {
    return (
        // Wrap the radio button and label in a flex container.
        <div className="flex items-center mb-4">
      {/* Render the radio button. */}
            <input
                type="radio"
                name={name} // Set the name of the radio button group.
                value={value} // Set the value of the radio button.
                checked={checked} // Check the radio button if it is currently checked.
                onChange={onChange} // Call the onChange function when the radio button changes.
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" // Set the appearance of the radio button.
                {...props}
            />
      {/* Render the label for the radio button, if provided. */}
            {label && <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>}
        </div>
    );
};

export default RadioButton;


