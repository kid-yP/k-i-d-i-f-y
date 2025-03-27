import { useLocation, useNavigate } from 'react-router-dom';
import TrackList from '../components/TrackList';
import { FiArrowLeft } from 'react-icons/fi';

export default function Search() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tracks = state?.tracks || [];
  const searchQuery = state?.searchQuery || '';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Results for "{searchQuery}"
      </h1>

      {tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No tracks found. Try a different search.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            New Search
          </button>
        </div>
      )}
    </div>
  );
}