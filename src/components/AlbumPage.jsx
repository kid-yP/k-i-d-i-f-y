import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MusicPlayer from './MusicPlayer'; 

const AlbumPage = ({ album, selectedTrack }) => {
  const { id } = useParams(); // Getting album ID from the URL parameter
  const [currentTrack, setCurrentTrack] = useState(selectedTrack);

  useEffect(() => {
    if (album) {
      // Fetch album details if not passed directly (optional depending on your data)
      console.log(`Fetching details for album ID: ${id}`);
      // You can fetch album details from an API or use a local album object
    }
  }, [id, album]);

  return (
    <div className="album-page bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl max-w-6xl mx-auto border border-gray-700/50">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={album?.cover_xl}
            alt={album?.title}
            className="w-64 h-64 rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">{album?.title}</h2>
          <p className="text-lg text-gray-400">{album?.description}</p>
        </div>
      </div>

      {/* Tracks */}
      <div>
        {album?.tracks?.map((track) => (
          <div key={track.id} className="flex justify-between items-center mb-4">
            <p className="text-white">{track.title}</p>
            <button onClick={() => setCurrentTrack(track)}>
              <MusicPlayer track={currentTrack} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
