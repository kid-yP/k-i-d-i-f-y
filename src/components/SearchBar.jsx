// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query); // Call the onSearch function passed as prop
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
        placeholder="Search for tracks, artists, or albums"
        className="p-2 border border-gray-300 rounded-full w-1/2"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded-full">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
