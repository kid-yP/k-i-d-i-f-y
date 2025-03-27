import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const TrackList = ({ tracks }) => {
  if (!tracks?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tracks to display</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
      {tracks.map((track) => (
        <Link 
          to={`/player/${track.id}`} 
          state={{ track }}
          key={track.id}
          className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="w-full rounded-lg aspect-square object-cover mb-3"
            />
            <button className="absolute bottom-5 right-5 bg-purple-600 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FaPlay className="text-white" />
            </button>
          </div>
          <h3 className="font-bold truncate">{track.title}</h3>
          <p className="text-gray-600 text-sm truncate">{track.artist.name}</p>
          <p className="text-gray-400 text-xs mt-1">
            {Math.floor(track.duration / 60)}:
            {(track.duration % 60).toString().padStart(2, '0')}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default TrackList;