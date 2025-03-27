import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { searchTracks } from '../api/deezer';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setIsLoading(true);
      const results = await searchTracks(query);
      
      if (!results?.length) {
        setError('No results found');
        return;
      }

      navigate('/search', { 
        state: { 
          tracks: results,
          searchQuery: query,
          timestamp: Date.now() // Avoid stale data
        } 
      });

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, artists, or albums..."
          className="block w-full px-5 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-purple-500 text-gray-900"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors flex items-center ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="inline-block animate-spin mr-2">↻</span>
          ) : (
            <FiSearch className="mr-2" />
          )}
          Search
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center animate-fade-in">
          {error}
        </p>
      )}
    </form>
  );
};

export default SearchBar;