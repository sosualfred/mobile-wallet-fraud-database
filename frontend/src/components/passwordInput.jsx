// src/components/passwordInput.jsx
// This component renders an input field for entering passwords, with a toggle button to show or hide the password.

import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

// PasswordInput component
// Props:
// - label: The label for the input field.
// - value: The current value of the input field.
// - onChange: The function to call when the input field changes.
// - placeholder: The placeholder text for the input field.
const PasswordInput = ({ label, value, onChange, placeholder, ...props }) => {
    // State to track whether the password should be shown or hidden.
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            {/* Render the label for the input field, if provided. */}
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {/* Render the input field itself. */}
                <input
                    type={showPassword ? 'text' : 'password'} // Toggle the type of the input field based on the showPassword state.
                    value={value} // Set the value of the input field.
                    onChange={onChange} // Call the onChange function when the input field changes.
                    placeholder={placeholder} // Set the placeholder text for the input field.
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Set the appearance of the input field.
                    {...props} // Pass any additional props to the input field.
                />
                {/* Render the toggle button to show or hide the password. */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state when the button is clicked.
                    className="absolute inset-y-0 right-0 flex items-center pr-3" // Set the appearance of the button.
                >
                    {/* Render the icon to show or hide the password, based on the current state. */}
                    {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;

