// src/components/textInput.jsx
// This component renders an input field for text input.

import React from 'react';

// The TextInput component accepts the following props:
// - label: The label for the input field.
// - value: The current value of the input field.
// - onChange: The function to call when the input field changes.
// - placeholder: The placeholder text for the input field.
const TextInput = ({ label, value, onChange, placeholder, ...props }) => {
    return (
        <div className="mb-4">
            {/* Render the label for the input field, if provided. */}
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {/* Display the label text. */}
                    {label}
                </label>
            )}
            {/* Render the input field itself. */}
            <input
                type="text" // Set the input type to "text" for text input.
                value={value} // Set the value of the input field.
                onChange={onChange} // Call the onChange function when the input field changes.
                placeholder={placeholder} // Set the placeholder text for the input field.
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Set the appearance of the input field.
                {...props} // Pass any additional props to the input field.
            />
        </div>
    );
};

export default TextInput;

