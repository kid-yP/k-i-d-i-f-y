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

      {/* Album Cover */}
      <div className="text-center mt-4">
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-full h-48 object-cover rounded-md mx-auto"
        />
      </div>

      {/* List of Tracks in the Album */}
      <div className="mt-6">
        <ul className="space-y-2 mt-4">
          {album.tracks?.data?.map((track) => (
              <span>{track.title} - {track.artist?.name}</span>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;
