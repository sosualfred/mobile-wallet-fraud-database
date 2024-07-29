// src/components/searchInput.jsx
// This component renders a search input field with an optional label.

import React from 'react';
import { SearchIcon } from 'lucide-react';

// SearchInput component
// Props:
// - label: The label for the input field.
// - value: The current value of the input field.
// - onChange: The function to call when the input field changes.
// - placeholder: The placeholder text for the input field.
// - props: Additional props to pass to the input field.
const SearchInput = ({ label, value, onChange, placeholder, ...props }) => {
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
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || 'Search...'}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...props}
                />
                {/* Render the magnifying glass icon. */}
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
        </div>
    );
};

export default SearchInput;

