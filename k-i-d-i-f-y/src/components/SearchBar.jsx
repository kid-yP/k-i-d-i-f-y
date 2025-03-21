// src/components/SearchBar.jsx
import { useState } from "react";
import { searchTracks } from "../api/deezer";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    const tracks = await searchTracks(query);
    onSearch(tracks);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search for songs, artists, or albums"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-l"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;