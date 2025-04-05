import React, { useState, useEffect } from 'react';

const AlbumPage = ({
  album,
  selectedTrack,
  isPlaying,
  togglePlayPause,
  handleNextTrack,
  handlePreviousTrack,
  handleVolumeChange
}) => {
  const [currentTrack, setCurrentTrack] = useState(selectedTrack);
  
  // This will ensure the currently selected track is displayed when the page is loaded or when a new track is selected
  useEffect(() => {
    setCurrentTrack(selectedTrack);
  }, [selectedTrack]);

  if (!album) {
    return <p>Loading album information...</p>; // Display loading if album info is missing
  }

  return (
    <div className="album-page bg-white p-4 rounded-lg shadow-md max-w-screen-lg mx-auto">
      {/* Album Title and Artist Name */}
      <h2 className="text-3xl text-center text-blue-600">{album.title}</h2>
      <p className="text-lg text-center">{album.artist?.name || 'Unknown Artist'}</p>
      
      {/* Album Cover */}
      <div className="text-center mt-4">
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-full h-48 object-cover rounded-md mx-auto"
        />
      </div>

      {/* Audio Controls */}
      <div className="audio-controls flex justify-between mt-6">
        <button onClick={handlePreviousTrack} className="bg-blue-500 text-white p-2 rounded-md">
          Prev
        </button>

        <button
          onClick={togglePlayPause}
          className={`bg-${isPlaying ? 'red' : 'green'}-500 text-white p-2 rounded-md`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button onClick={handleNextTrack} className="bg-blue-500 text-white p-2 rounded-md">
          Next
        </button>
      </div>

      {/* Volume Control */}
      <div className="volume-control mt-6">
        <label htmlFor="volume" className="text-sm">Volume:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          onChange={handleVolumeChange}
          className="w-full mt-2"
        />
      </div>

      {/* List of Tracks in the Album */}
      <div className="mt-6">
        <h3 className="text-xl text-center">Tracks</h3>
        <ul className="space-y-2 mt-4">
          {album.tracks?.data?.map((track) => (
            <li key={track.id} className="text-lg flex justify-between items-center">
              <span>{track.title} - {track.artist?.name}</span>
              <button
                onClick={() => setCurrentTrack(track)} // Set track when clicked
                className="text-blue-500 hover:underline"
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;
