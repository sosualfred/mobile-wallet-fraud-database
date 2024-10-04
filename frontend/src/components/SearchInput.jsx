import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({ className = "", ...props }) => {
  return (
    <div className={`relative flex-grow ${className}`}>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchInput;
