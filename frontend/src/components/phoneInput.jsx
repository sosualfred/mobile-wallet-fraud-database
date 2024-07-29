// src/components/phoneInput.jsx
// This component renders an input field for phone numbers.

import React from 'react';
import { PhoneIcon } from 'lucide-react';

// PhoneInput component
// Props:
// - label: The label for the input field.
// - value: The current value of the input field.
// - onChange: The function to call when the input field changes.
// - placeholder: The placeholder text for the input field.
const PhoneInput = ({ label, value, onChange, placeholder, ...props }) => {
    return (
        <div className="mb-4">
            {/* Render the label for the input field, if provided. */}
            {label && (
                <div className="flex items-center mb-2 text-sm font-medium text-gray-700">
                    {/* Render the phone icon. */}
                    <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {/* Render the label text. */}
                    {label}
                </div>
            )}
            {/* Render the input field itself. */}
            <input
                type="tel" // Set the input type to "tel" for phone numbers.
                value={value} // Set the value of the input field.
                onChange={onChange} // Call the onChange function when the input field changes.
                placeholder={placeholder || 'e.g. 02345xxxxx'} // Set the placeholder text for the input field.
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Set the appearance of the input field.
                {...props} // Pass any additional props to the input field.
            />
        </div>
    );
};

export default PhoneInput;

